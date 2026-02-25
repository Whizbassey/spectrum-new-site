'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { RainbowButton } from "@/components/ui/rainbow-button"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/5 border border-white/10 rounded-full pt-3 pr-4 pb-3 pl-4 shadow-xl backdrop-blur-md w-[95vw] max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/spectrumlogo.webp"
            alt="Spectrum AI logo"
            width={36}
            height={36}
            className="w-9 h-9"
            priority
          />
          <span className="ml-2 text-sm font-medium">Spectrum AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-xs text-secondary ml-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="random-hover-color transition-colors uppercase">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-3 ml-8">
          <RainbowButton asChild className="hidden md:inline-block text-xs font-medium uppercase px-6">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2">
                <span className="random-hover-color">Let's Talk</span>
                <ArrowUpRight className="ml-1 w-5 h-5 rainbow-arrow-animate" />
              </span>
            </Link>
          </RainbowButton>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md text-secondary hover:text-primary-500 hover:bg-gray-100"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white/80 border border-white/20 rounded-xl shadow-lg backdrop-blur-md p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-secondary random-hover-color transition-colors rounded-md font-medium uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4">
            <RainbowButton asChild className="w-full text-center block uppercase">
              <Link href="/contact">Contact Us</Link>
            </RainbowButton>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header 
