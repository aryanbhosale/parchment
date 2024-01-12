import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parchment | Elevate Your Documents with Conversational Grace',
  description: "Discover a transformative way to engage with your documents at Parchment. Seamlessly converse with your PDFs and DOCX files, unlocking a new dimension of interactive possibilities. Elevate your document experience with Parchment's intuitive platform - where effortless conversations meet insightful exploration. Try it today!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>{children}</body>
    </html>
  )
}
