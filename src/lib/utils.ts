import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if(typeof window !== "undefined") {
    return path
  } 
  if(process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`
  }
  return `http://localhost:${process.env.PORT || 3000}${path}`
}

export function constructMetadata({
  title = "Parchment | Elevate Your Documents with Conversational Grace",
  description = "Discover a transformative way to engage with your documents at Parchment. Seamlessly converse with your PDFs and DOCX files, unlocking a new dimension of interactive possibilities. Elevate your document experience with Parchment's intuitive platform - where effortless conversations meet insightful exploration. Try it today!",
  image = "/thumbnail.png",
  icons = "/favicon.png",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@thearyanbhosale"
    },
    icons,
    metadataBase: new URL('https://parchment-three.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}