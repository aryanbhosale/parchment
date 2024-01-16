"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { GhostIcon } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-700 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-200">
          File Sanctuary
        </h1>
        <UploadButton />
      </div>
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files.sort(
            (a, b) =>
              new Date(b?.createdAt).getTime() -
              new Date(a?.createdAt).getTime()
          ).map((file) => (
            <li key={file?.id} className="colspan-1 divide-y divide-gray-200 rounded-lg bg-black shadow transition hover:shadow-lg">
              <Link href={`/dashboard/${file?.id}`} className="flex flex-col gap-2">
                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                  <div className="h-10 w-10 flex flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium text-zinc-100">{file?.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
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
