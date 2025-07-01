'use client'

import Link from 'next/link'
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Spectrum AI</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Transforming businesses through intelligent automation and AI solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services#process-automation" className="hover:text-primary-400 transition-colors">Process Automation</Link></li>
              <li><Link href="/services#chatbots" className="hover:text-primary-400 transition-colors">AI Chatbots</Link></li>
              <li><Link href="/services#analytics" className="hover:text-primary-400 transition-colors">Data Analytics</Link></li>
              <li><Link href="/services#ml" className="hover:text-primary-400 transition-colors">Machine Learning</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>hello@spectrumai.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Spectrum AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 