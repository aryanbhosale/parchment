"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { GhostIcon, Loader2, MessageSquare, PlusIcon, Trash } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<String | null>(null)
  const utils = trpc.useUtils()

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id)
    },
    onSettled: () => {
      setCurrentlyDeletingFile(null)
    }
  })

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-700 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-200">
          File Sanctuary
        </h1>
        <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
      </div>
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b?.createdAt).getTime() -
                new Date(a?.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file?.id}
                className="colspan-1 divide-y divide-gray-200 rounded-lg bg-black shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file?.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-100">
                          {file?.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    {format(new Date(file?.createdAt), "dd MMM, yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    mocked
                  </div>
                  <Button onClick={() => deleteFile({ id: file?.id })} size={"sm"} className="w-full" variant={"destructive"}>
                    {currentlyDeletingFile === file?.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" /> 
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <SkeletonTheme baseColor="#020024" highlightColor="#8b0464">
          <p>
            <Skeleton height={100} className="mt-2" count={3} />
          </p>
        </SkeletonTheme>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2 ">
          <GhostIcon className="h-8 text-zinc-200" />
          <h3 className="font-semibold text-xl">WOW! Such empty...</h3>
          <p>The digital shelves await your first PDF</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
