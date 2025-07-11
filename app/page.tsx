'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Zap, BarChart3, MessageSquare, Shield, Users, TrendingUp } from 'lucide-react'
import { AuroraBackground } from '@/components/AuroraBackground'
import React from 'react'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { FeatureSteps } from "@/components/ui/feature-section";
import { PricingCard } from "@/components/ui/dark-gradient-pricing";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from '@/components/ui/button'
import { BentoGrid } from "@/components/ui/bento-grid";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard } from "@/components/ui/bento-grid";
import { ServicesStack } from "@/components/ui/services-stack";
import { FAQ } from "@/components/ui/faq";
import { About3 } from '@/components/ui/about-3'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Solutions',
      description: 'Cutting-edge artificial intelligence that adapts to your business needs.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Process Automation',
      description: 'Streamline operations and eliminate manual tasks with intelligent automation.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights for better decision making.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Smart Chatbots',
      description: '24/7 customer support with intelligent conversational AI.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '99%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ]

  // Add companies array for the logo marquee
  const companies = [
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg', alt: 'Arc' },
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg', alt: 'Descript' },
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg', alt: 'Mercury' },
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg', alt: 'Ramp' },
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg', alt: 'Retool' },
    { src: 'https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg', alt: 'Watershed' },
  ];

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {/* Hero Section */}
      <RevealOnScroll>
        <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-32 md:pt-40 md:pb-40 text-center min-h-screen">
          {/* Blurred white circle background */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-white opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Glassy badge */}
          <Badge className="mb-8" color="default">AI Automations Agency</Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
            Your Future is Intelligent. We Make It Inevitable.
          </h1>

          {/* Subheading */}
          <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
            Transform your business with AI that doesn't just automate—it anticipates, adapts, and accelerates your success. We're not just building AI solutions; we're architecting the future of how your business operates.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowButton asChild>
              <a href="/contact">Start Your AI Evolution</a>
            </RainbowButton>
            <RainbowButton asChild>
              <a href="/case-studies">See What's Possible</a>
            </RainbowButton>
          </div>
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-32"></div>
        </section>
      </RevealOnScroll>

      {/* Company Logo Marquee Section */}
      <RevealOnScroll>
        <div className="py-12">
          <div className="flex justify-center">
            <Badge className="mb-4 inline-block" color="emerald">Trusted by clients worldwide</Badge>
          </div>
          <div className="mt-8 overflow-hidden relative">
            {/* Left and Right Black Blur Overlays */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10" style={{background: 'linear-gradient(to right, rgba(0,0,0,1) 90%, transparent 100%)'}} />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10" style={{background: 'linear-gradient(to left, rgba(0,0,0,1) 90%, transparent 100%)'}} />
            <div className="p-0 rounded-none flex items-center gap-8 min-w-[200%] animate-company-marquee whitespace-nowrap bg-transparent border-none shadow-none">
              {companies.concat(companies).concat(companies).map((company, idx) => (
                <img
                  key={company.src + idx}
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 inline-block"
                  style={{ filter: 'invert(1) brightness(2)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Services Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <Badge className="mb-6 inline-block" color="orange">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">We Don't Just Implement AI—We Orchestrate Intelligence</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Every business has unique DNA. That's why we craft AI solutions that learn your language, understand your challenges, and evolve with your ambitions. From intelligent automation to predictive analytics, we turn your data into your competitive advantage.
            </p>
          </div>
          <ServicesStack />
        </section>
      </RevealOnScroll>

      {/* 3. Case Study/How AI Transforms Businesses */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 inline-block" color="violet">Case Studies</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Featured Case Studies</h2>
            <p className="text-xl text-neutral-300 mb-12">See how we've helped businesses transform with AI automation.</p>
            <BentoGrid className="lg:grid-rows-3">
              <BentoCard
                Icon={FileTextIcon}
                name="Retail Automation Success"
                description="How a major retailer automated inventory and improved efficiency by 40%."
                href="#"
                background={
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop"
                    className="absolute -right-20 -top-20 opacity-60 object-cover w-60 h-60"
                    alt="Retail Automation"
                  />
                }
                className="lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3"
              />
              <BentoCard
                Icon={InputIcon}
                name="AI Chatbots for Support"
                description="A SaaS company reduced support costs and improved customer satisfaction with AI chatbots."
                href="#"
                background={
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                    className="absolute -right-20 -top-20 opacity-60 object-cover w-60 h-60"
                    alt="Chatbots"
                  />
                }
                className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
              />
              <BentoCard
                Icon={GlobeIcon}
                name="Predictive Analytics in Finance"
                description="A fintech startup leveraged AI to predict market trends and boost revenue."
                href="#"
                background={
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                    className="absolute -right-20 -top-20 opacity-60 object-cover w-60 h-60"
                    alt="Analytics"
                  />
                }
                className="lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
              />
              <BentoCard
                Icon={CalendarIcon}
                name="Healthcare Automation"
                description="Automating patient scheduling and follow-ups for a large clinic network."
                href="#"
                background={
                  <img
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800&auto=format&fit=crop"
                    className="absolute -right-20 -top-20 opacity-60 object-cover w-60 h-60"
                    alt="Healthcare"
                  />
                }
                className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2"
              />
              <BentoCard
                Icon={BellIcon}
                name="Smart Manufacturing"
                description="AI-driven quality control and process optimization in manufacturing."
                href="#"
                background={
                  <img
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=800&auto=format&fit=crop"
                    className="absolute -right-20 -top-20 opacity-60 object-cover w-60 h-60"
                    alt="Manufacturing"
                  />
                }
                className="lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4"
              />
            </BentoGrid>
          </div>
        </section>
      </RevealOnScroll>

      {/* 5. Pricing Table */}
      {/* (Section removed as per request) */}

      {/* 6. Testimonials */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 inline-block" color="pink">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Join Industry Leaders Who've Already Stepped Into Tomorrow</h2>
            <p className="text-xl text-white/80 mb-8">Companies across sectors trust us to navigate their AI transformation. From startups to Fortune 500s, we've helped businesses increase efficiency by 300% and reduce operational costs by 60%.</p>
            <AnimatedTestimonials
              testimonials={[
                {
                  quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
                  name: "Sarah Chen",
                  designation: "Product Manager at TechFlow",
                  src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
                  name: "Michael Rodriguez",
                  designation: "CTO at InnovateSphere",
                  src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
                  name: "Emily Watson",
                  designation: "Operations Director at CloudScale",
                  src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
                  name: "James Kim",
                  designation: "Engineering Lead at DataPro",
                  src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
                  name: "Lisa Thompson",
                  designation: "VP of Technology at FutureNet",
                  src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              ]}
            />
          </div>
        </section>
      </RevealOnScroll>

      {/* FAQ Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 inline-block" color="blue">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </section>
      </RevealOnScroll>

      {/* 10. Final CTA */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 inline-block" color="emerald">Get Started</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Let AI do the Work so you can Scale Faster</h2>
            <RainbowButton asChild className="text-2xl px-12 py-6 inline-flex items-center mt-8">
              <a href="/contact">Book a Consultation</a>
            </RainbowButton>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  )
} 