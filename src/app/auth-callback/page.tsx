"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get('origin')

    const { data, isSuccess, isError, error } = trpc.authCallback.useQuery(undefined, {
        retry: true,
        retryDelay: 500
    });

    useEffect(() => {
        if (isSuccess && data?.success) {
            router.push(origin ? `/${origin}` : '/dashboard');
        } else if (isError) {
            if(error.data?.code === "UNAUTHORIZED") {
                router.push('/sign-in')
            }
        }
    }, [isSuccess, origin, isError, router, error, data]);

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-200" />
                <h3 className="font-semibold text-xl">Crafting Your Parchment Sanctuary...</h3>
                <p>You will be redirected</p>
            </div>
        </div>
    )

}

export default Page