import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { getPineconeClient } from "@/lib/pinecone";
import { PineconeStore } from "@langchain/pinecone"
import { OpenAIEmbeddings } from "@langchain/openai"
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

const f = createUploadthing();


export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        const { getUser } = getKindeServerSession();
        const user = await getUser()
        if(!user || !user?.id) {
            throw new Error("UNAUTHORIZED")
        }
        const subscriptionPlan = await getUserSubscriptionPlan()
      return {subscriptionPlan, userId: user?.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const createdFile = await db.file.create({
            data: {
                key: file?.key,
                name: file?.name,
                userId: metadata?.userId,
                url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file?.key}`,
                uploadStatus: 'PROCESSING'
            }
        })
        try {
            const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file?.key}`)
            const blob = await response.blob()

            const loader = new PDFLoader(blob)
            const pageLevelDocs = await loader.load()
            const pagesAmt = pageLevelDocs.length

            const { subscriptionPlan } = metadata
            const { isSubscribed } = subscriptionPlan
            const isProExceeded = pagesAmt > PLANS.find((plan) => plan.name === "PRO")!.pagesPerPdf
            const isFreeExceeded = pagesAmt > PLANS.find((plan) => plan.name === "FREE")!.pagesPerPdf

//time 10:55:20          
            if((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
                await db.file.update({
                    data: {
                        uploadStatus: "FAILED"
                    },
                    where: {
                        id: createdFile.id
                    }
                })
            }

            //vectorize & index the doc
            const pinecone = await getPineconeClient();
            const pineconeIndex = pinecone.Index("parchment")
            const embeddings = new OpenAIEmbeddings({
                openAIApiKey: process.env.OPENAI_API_KEY
            })
            await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
                pineconeIndex,
                namespace: createdFile.id
            })

            await db.file.update({
                data: {
                    uploadStatus: "SUCCESS"
                },
                where: {
                    id: createdFile.id
                }
            })
        } catch (err) {
            console.log(err)
            await db.file.update({
                data: {
                    uploadStatus: "FAILED"
                },
                where: {
                    id: createdFile.id
                }
            })
        }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
