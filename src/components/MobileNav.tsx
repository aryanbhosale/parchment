"use client"

import { ArrowRight, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleOpen = () => setIsOpen((prev) => !prev)
    const pathname = usePathname()
    useEffect(() => {
        if(isOpen) toggleOpen()
    }, [pathname])
const closeOnCurrent = (href: string) => {
    if(pathname === href) toggleOpen()
}
    
  return (
    <div className='sm:hidden'>
        <MenuIcon onClick={toggleOpen} className='relative z-50 h-5 w-5 text-zinc-300' />
        {isOpen ? (
            <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
                <ul className='absolute bg-gray-700 border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
                    {!isAuth ? (
                        <>
                            <li>
                                <Link onClick={() => closeOnCurrent('/sign-up')} className='flex items-center w-full font-semibold text-green-600' href={"/sign-up"}>Dive In<ArrowRight className='ml-2 h-5 w-5' /></Link>
                            </li>
                            <li className='my-3 h-px w-full bg-gray-700' />
                            <li>
                                <Link onClick={() => closeOnCurrent('/sign-in')} className='flex items-center w-full font-semibold' href={"/sign-in"}>Sign In<ArrowRight className='ml-2 h-5 w-5' /></Link>
                            </li>
                            <li className='my-3 h-px w-full bg-gray-700' />
                            <li>
                                <Link onClick={() => closeOnCurrent('/pricing')} className='flex items-center w-full font-semibold' href={"/pricing"}>Pricing<ArrowRight className='ml-2 h-5 w-5' /></Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link onClick={() => closeOnCurrent('/dashboard')} className='flex items-center w-full font-semibold' href={"/dashboard"}>Dashboard<ArrowRight className='ml-2 h-5 w-5' /></Link>
                            </li>
                            <li className='my-3 h-px w-full bg-gray-700' />
                            <li>
                                <Link className='flex items-center w-full font-semibold' href={"/sign-out"}>Logout<ArrowRight className='ml-2 h-5 w-5' /></Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        ) : null}
    </div>
  )
}

export default MobileNav