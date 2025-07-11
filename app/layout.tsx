import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlassBackdrop from '@/components/GlassBackdrop'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import ClientLayout from '@/components/ClientLayout'
// import { StagewiseToolbar } from '@stagewise/toolbar-next'
// import { ReactPlugin } from '@stagewise-plugins/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spectrum AI - AI Automations Agency',
  description: 'Leading AI automation solutions for businesses. We transform operations with cutting-edge artificial intelligence and machine learning technologies.',
  keywords: 'AI automation, machine learning, business automation, artificial intelligence, digital transformation',
  authors: [{ name: 'Spectrum AI Team' }],
  openGraph: {
    title: 'Spectrum AI - AI Automations Agency',
    description: 'Leading AI automation solutions for businesses',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
} 