import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { ArrowRight } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-700 bg-black/75 backdrop-blur-sm transition-all rounded-2xl">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-900">
                <Link href="/" className="flex z-48 font-semibold text-2xl">
                    parchment.
                </Link>


                <div className="hidden items-center space-x-4 sm:flex">
                    <>
                        <Link href="/pricing" className={buttonVariants({
                            variant: "ghost",
                            size: "sm"
                        })}>Pricing</Link>
                        <LoginLink className={buttonVariants({
                            variant: "ghost",
                            size: "sm"
                        })}>
                            Sign in
                        </LoginLink>
                        <RegisterLink className={buttonVariants({
                            size: "sm"
                        })}>
                            Dive in <ArrowRight className='ml-1.5 h-5 w-5' />
                        </RegisterLink>
                    </>
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar