'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, BarChart3, MessageSquare, Database, Shield, Cpu, Globe, Cloud, LineChart, Clock, Activity, Search, Settings, Hammer, Rocket, Users, ArrowRight } from 'lucide-react'
import { ServiceCard } from '@/components/ui/card'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Badge } from '@/components/ui/button'
import MainServicesCard from '@/components/ui/main-services-card'
import { BentoGrid } from '@/components/ui/bento-grid'
import { ServicesStack } from '@/components/ui/services-stack'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export default function Services() {
  const services = [
    {
      id: 'process-automation',
      icon: <Zap className="w-8 h-8" />,
      title: 'Process Automation',
      description: 'Streamline your business operations with intelligent automation solutions.'
    },
    {
      id: 'chatbots',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'AI Chatbots',
      description: 'Enhance customer experience with intelligent conversational AI.'
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights for better decision making.'
    },
    {
      id: 'ml',
      icon: <Brain className="w-8 h-8" />,
      title: 'Machine Learning',
      description: 'Build custom ML models tailored to your specific business needs.'
    },
    {
      id: 'ai-transformation',
      icon: <Cpu className="w-8 h-8" />,
      title: 'AI Transformation',
      description: 'Reimagine your business processes and strategy with end-to-end AI transformation.'
    },
    {
      id: 'custom-ai-tool',
      icon: <Globe className="w-8 h-8" />,
      title: 'Custom AI Tool Development',
      description: 'Design and deploy bespoke AI tools tailored to your unique business challenges.'
    }
  ]

  const technologies = [
    { name: 'AI-Driven Solutions', icon: Zap },
    { name: 'Serverless Computing', icon: Database },
    { name: 'Cloud Integration', icon: Cloud },
    { name: 'Data Insight', icon: BarChart3 },
    { name: 'Analytics', icon: LineChart },
    { name: 'API Security', icon: Shield },
    { name: 'Real-Time', icon: Clock },
    { name: 'Ad Targeting', icon: Activity },
  ]

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
                Our Value Offerings
              </h1>
              <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
                Explore our comprehensive suite of AI-powered solutions and services, each designed to deliver real value and measurable impact for your business.
              </p>
              <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Homepage Services Section */}
      <RevealOnScroll>
        <section className="pt-0 pb-20">
          <div className="flex flex-col items-center mb-2">
            <Badge className="mb-4 inline-block" color="orange">Our Services</Badge>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">We Don't Just Implement AI—We Orchestrate Intelligence</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Every business has unique DNA. That's why we craft AI solutions that learn your language, understand your challenges, and evolve with your ambitions. From intelligent automation to predictive analytics, we turn your data into your competitive advantage.
            </p>
          </div>
          <ServicesStack />
        </section>
      </RevealOnScroll>

      {/* Our Solutions Section */}
      <RevealOnScroll>
        <section className="py-20">
          <div className="flex flex-col items-center mb-2">
            <Badge className="mb-4 inline-block" color="violet">Our Solutions</Badge>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center uppercase">Transforming Every Corner of Your Business</h2>
            <p className="text-lg text-white/80 text-center">
              Discover the categories of AI automation solutions we create for businesses of all sizes. From customer service to finance, our automations are designed to drive efficiency, growth, and innovation across every department.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Customer Service',
                desc: 'AI chatbots, support hubs, and feedback analyzers for 24/7 customer delight.',
                icon: <MessageSquare className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'Sales & Marketing',
                desc: 'Lead scoring, content personalization, and social media automation to boost growth.',
                icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'Operations',
                desc: 'Document processing, inventory management, and workflow automations for efficiency.',
                icon: <Cpu className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'HR',
                desc: 'AI-powered hiring, onboarding, and employee sentiment analysis for better teams.',
                icon: <Users className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'Finance',
                desc: 'Expense categorization, cash flow prediction, and smart reporting for financial clarity.',
                icon: <Shield className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'Industry-Specific',
                desc: 'Tailored AI automations for restaurants, healthcare, real estate, and more.',
                icon: <Globe className="w-8 h-8 text-cyan-400" />,
              },
              {
                title: 'Content & Creative',
                desc: 'AI tools for content creation, product descriptions, and video automation.',
                icon: <Zap className="w-8 h-8 text-cyan-400" />,
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className={
                  'glass-card bg-black/60 border border-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-start transition-all group hover:rainbow-glow'
                }
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase">{cat.title}</h3>
                <p className="text-white/80 mb-4">{cat.desc}</p>
              </div>
            ))}
            {/* Final Card: Explore Library */}
            <div className="glass-card bg-black/60 border border-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-start justify-center transition-all group hover:rainbow-glow">
              <h3 className="text-xl font-bold text-white mb-2">Explore Our Solutions Library</h3>
              <p className="text-white/80 mb-4">Browse all our AI automations and discover what's possible for your business.</p>
              <RainbowButton
                asChild
                className="text-base md:text-sm px-4 py-2 flex items-center gap-2 font-semibold transition-transform duration-150 hover:scale-95"
              >
                <a href="/solutions">
                  <span>Go to Solutions Gallery</span>
                  <ArrowRight className="w-4 h-4 ml-1 inline" />
                </a>
              </RainbowButton>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Process Section */}
      <RevealOnScroll>
        <section className="py-24 flex justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col items-center mb-2">
              <Badge className="mb-4 inline-block" color="blue">Our Process</Badge>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase">The RISE Framework</h2>
              <p className="text-base text-white max-w-2xl mx-auto">
                A Proven Methodology to Deliver Successful AI Solution
              </p>
            </motion.div>
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                { step: '01', title: 'RECOGNIZE', subtitle: 'Discovery & Assessment', description: 'We analyze your business to identify high-impact AI opportunities that align with your goals.', icon: Search },
                { step: '02', title: 'INTELLIGENCE', subtitle: 'Strategy & Planning', description: 'We design custom AI solutions and create implementation roadmaps that ensure maximum ROI.', icon: Settings },
                { step: '03', title: 'SOLUTION', subtitle: 'Development & Integration', description: 'We build and integrate AI solutions that work seamlessly with your existing systems.', icon: Hammer },
                { step: '04', title: 'EXECUTION', subtitle: 'Deployment & Optimization', description: 'We deploy, train, and optimize your AI solutions for sustained business transformation.', icon: Rocket }
              ].map((process, index, arr) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="animated-border card-container w-full h-full rounded-2xl">
                    <div className="relative z-10 bg-black/80 rounded-2xl p-10 min-h-[260px] flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.15 }}
                        className="w-16 h-16 bg-black/90 border border-white/10 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg"
                      >
                        <process.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 uppercase tracking-wider">{process.title}</h3>
                      <div className="text-base md:text-lg font-semibold text-cyan-300 mb-2 uppercase">{process.subtitle}</div>
                      <p className="text-white text-base md:text-lg max-w-xs">{process.description}</p>
                    </div>
                  </div>
                  {/* Draw connecting line except for last card */}
                  {index < arr.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 w-10 h-0.5 bg-white z-10" style={{left: '100%'}} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-xl mx-auto">
          <div className="glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 text-white">
              Let's discuss how our AI services can transform your business.
            </p>
            <RainbowButton asChild>
              <a href="/contact">Schedule a Consultation</a>
            </RainbowButton>
          </div>
        </div>
      </section>
    </div>
  )
} 