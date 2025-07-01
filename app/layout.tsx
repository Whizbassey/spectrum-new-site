import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-dark-50 to-dark-100">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 