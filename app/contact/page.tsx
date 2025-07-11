'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Badge } from '@/components/ui/button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Supabase integration will go here
  }

  return (
    <RevealOnScroll>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 mt-32">
        <div className="max-w-2xl w-full text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
            Contact Us
          </h1>
          <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
            We'd love to hear from you! Reach out for project inquiries, partnerships, or just to say hello. Our team will get back to you as soon as possible.
          </p>
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
        </div>
        <div className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Info */}
            <div className="md:w-5/12 p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex flex-col">
              <RevealOnScroll>
                <div>
                  <Badge className="mb-4 inline-block" color="blue">Get in Touch</Badge>
                  <p className="mt-2 text-secondary text-sm">We're always open to discussing product design, teaching opportunities, or partnerships.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div className="mt-auto">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-indigo-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-secondary font-medium">Email</p>
                        <p className="text-secondary">hello@spectrumai.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-indigo-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-secondary font-medium">Location</p>
                        <p className="text-secondary">Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex space-x-4">
                    <a href="#" className="text-secondary hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-secondary hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-secondary hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
            {/* Right side - Form */}
            <div className="md:w-7/12 p-8 border-t md:border-t-0 md:border-l border-white/10 bg-black/30">
              <RevealOnScroll>
                <form>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-secondary mb-1.5">Name</label>
                      <input type="text" id="name" className="form-input w-full px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-secondary mb-1.5">Email</label>
                      <input type="email" id="email" className="form-input w-full px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-secondary mb-1.5">Subject</label>
                      <select id="subject" className="form-input w-full px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition appearance-none">
                        <option value="" disabled selected className="bg-gray-900">Select a topic</option>
                        <option value="collaboration" className="bg-gray-900">Collaboration</option>
                        <option value="courses" className="bg-gray-900">Courses & Teaching</option>
                        <option value="speaking" className="bg-gray-900">Speaking Request</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-secondary mb-1.5">Message</label>
                      <textarea id="message" rows={4} className="form-input w-full px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition resize-none" placeholder="Tell us about your project or inquiry..." />
                    </div>
                    <div className="pt-2">
                      <RainbowButton type="submit" className="w-full py-2.5 text-sm font-medium rounded-md">Send Message</RainbowButton>
                    </div>
                  </div>
                </form>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
} 