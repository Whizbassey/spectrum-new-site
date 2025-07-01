'use client'

import Link from 'next/link'
import { Ghost, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 text-center">
      <div className="flex flex-col items-center">
        <Ghost className="w-20 h-20 text-primary-500 mb-6 animate-float" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Oops! The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
} 