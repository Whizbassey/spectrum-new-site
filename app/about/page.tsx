'use client'

import { motion } from 'framer-motion'
import { Users, Target, Award, Globe, Brain, Zap, Shield, RefreshCw } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Badge } from '@/components/ui/button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export default function About() {
  const values = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Pushing the boundaries of what\'s possible with AI technology.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust',
      description: 'Building reliable and secure AI solutions you can depend on.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaboration',
      description: 'Working closely with clients to achieve shared success.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Excellence',
      description: 'Delivering exceptional results that exceed expectations.'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Former AI researcher at Google with 10+ years in machine learning.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Expert in scalable AI systems and cloud architecture.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of AI',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'PhD in Computer Science with focus on natural language processing.'
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack developer with expertise in AI integration.'
    }
  ]

  return (
    <section className="container mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <RevealOnScroll>
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
              About <span className="text-white">Spectrum</span>
            </h1>
            <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
              Innovation doesn't have to be intimidating. At Spectrum Hub, we take the most advanced AI technologies and make them work seamlessly for real businesses facing real challenges. Our DNA is wired for breakthrough thinking, but our solutions are built for practical impact. We don't just push boundaries—we make crossing them effortless for our clients.
            </p>
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="mb-2 flex flex-col items-center">
          <Badge className="mb-4 inline-block" color="orange">Our Story and Mission</Badge>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <h2 className="text-3xl font-medium text-center mb-12 uppercase">What Inspires Us</h2>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 relative rounded-lg p-px overflow-hidden">
            <div className="card-content rounded-lg p-8 relative z-10">
              <span className="text-xs uppercase tracking-wide text-cyan-400/80 mb-2 block">Our Story</span>
              <h2 className="text-2xl font-medium mb-4">Born from Curiosity, Driven by Possibility</h2>
              <p className="text-secondary mb-4">
                We started with a simple observation: the gap between AI's potential and its practical application was holding businesses back. While others saw complexity, we saw opportunity.
              </p>
              <p className="text-secondary">
                Founded by AI researchers and business strategists, we bridge the divide between cutting-edge technology and real-world results.
              </p>
            </div>
          </div>
          <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 relative rounded-lg p-px overflow-hidden">
            <div className="card-content rounded-lg p-8 relative z-10">
              <span className="text-xs uppercase tracking-wide text-cyan-400/80 mb-2 block">Our Mission</span>
              <h2 className="text-2xl font-medium mb-4">Making AI Accessible, Practical, and Transformative</h2>
              <p className="text-secondary mb-4">
                We believe every business deserves to harness the power of artificial intelligence, regardless of size or industry.
              </p>
              <p className="text-secondary">
                Our mission is to democratize AI transformation, making it as natural and essential as having a website or using email.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="mb-24">
          <div className="flex flex-col items-center mb-2">
            <Badge className="mb-4 inline-block" color="violet">Our Values</Badge>
          </div>
          <h2 className="text-3xl font-medium text-center mb-12 uppercase">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg">
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 uppercase">Innovation-Focused</h3>
                <p className="text-secondary">Innovation That Serves - We innovate with purpose, focusing on AI breakthroughs that solve real business challenges</p>
              </div>
            </div>
            <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg">
              <div className="p-8">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 uppercase">Client Success</h3>
                <p className="text-secondary">Client Success Obsession - Your wins are our wins; we measure our success by the transformation we create for your business</p>
              </div>
            </div>
            <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg">
              <div className="p-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 uppercase">Adaptability</h3>
                <p className="text-secondary">Adaptive Excellence - We evolve our approaches as quickly as AI technology advances, ensuring you always have the best solutions</p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="mb-24">
          <div className="flex flex-col items-center mb-2">
            <Badge className="mb-4 inline-block" color="blue">Our Team</Badge>
          </div>
          <h2 className="text-3xl font-medium text-center mb-4 uppercase">Meet the Architects of Your AI Future</h2>
          <p className="text-secondary text-center max-w-2xl mx-auto mb-12">Our team combines deep technical expertise with strategic business acumen. We're not just developers—we're transformation partners who understand that the best AI solutions are invisible to end users but transformative for businesses.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="team-member-card glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden relative transition-all duration-400 hover:-translate-y-3 hover:shadow-xl group rainbow-glow">
              <div className="img-gradient-mask relative">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Alex Johnson" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-medium">Alex Johnson</h3>
                <div className="role-tag inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 mb-2 bg-cyan-400/15 text-cyan-400">Founder & CEO</div>
                <p className="text-secondary text-sm mt-3">Visionary leader with 15+ years in software development and product management.</p>
                <div className="flex justify-center gap-2 mt-4">
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-twitter" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-linkedin-in" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-github" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            </div>
            <div className="team-member-card glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden relative transition-all duration-400 hover:-translate-y-3 hover:shadow-xl group rainbow-glow">
              <div className="img-gradient-mask relative">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Sarah Chen" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-medium">Sarah Chen</h3>
                <div className="role-tag inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 mb-2 bg-cyan-400/15 text-cyan-400">CTO</div>
                <p className="text-secondary text-sm mt-3">Engineering leader with expertise in scalable architecture and cloud infrastructure.</p>
                <div className="flex justify-center gap-2 mt-4">
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-twitter" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-linkedin-in" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-github" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            </div>
            <div className="team-member-card glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden relative transition-all duration-400 hover:-translate-y-3 hover:shadow-xl group rainbow-glow">
              <div className="img-gradient-mask relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="David Kim" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-medium">David Kim</h3>
                <div className="role-tag inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 mb-2 bg-cyan-400/15 text-cyan-400">Lead Developer</div>
                <p className="text-secondary text-sm mt-3">Full-stack developer with a passion for creating elegant solutions to complex problems.</p>
                <div className="flex justify-center gap-2 mt-4">
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-twitter" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-linkedin-in" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-github" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            </div>
            <div className="team-member-card glass-card bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden relative transition-all duration-400 hover:-translate-y-3 hover:shadow-xl group rainbow-glow">
              <div className="img-gradient-mask relative">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Emma Wilson" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-medium">Emma Wilson</h3>
                <div className="role-tag inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 mb-2 bg-cyan-400/15 text-cyan-400">UX Designer</div>
                <p className="text-secondary text-sm mt-3">Award-winning designer focused on creating intuitive and delightful user experiences.</p>
                <div className="flex justify-center gap-2 mt-4">
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-twitter" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-linkedin-in" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fab fa-dribbble" /></a>
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-cyan-400/60 transition-all"><i className="fas fa-envelope" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="card-container animated-border glass-card bg-black/40 backdrop-blur-lg border border-white/10 max-w-3xl mx-auto relative rounded-lg p-px overflow-hidden">
          <div className="card-content rounded-lg p-8 text-center relative z-10">
            <h2 className="text-2xl font-medium mb-6 uppercase">Ready to join us?</h2>
            <p className="text-secondary mb-8 max-w-lg mx-auto">
              Start building better applications today with Codeon's powerful development platform.
            </p>
            <RainbowButton asChild>
              <a href="#">Get started</a>
            </RainbowButton>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
} 