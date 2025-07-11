'use client'

import Link from 'next/link'
import { Ghost, ArrowLeft } from 'lucide-react'
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="glass-card p-12 rounded-2xl shadow-xl text-center">
        <h1 className="text-6xl font-bold text-white mb-4 uppercase">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2 uppercase">Page Not Found</h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <RainbowButton asChild>
          <Link href="/">Go Home</Link>
        </RainbowButton>
      </div>
    </div>
  )
} 