"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap, Settings, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/button'

const services = [
  {
    label: "AI Strategy & Consulting",
    title: "Strategic Intelligence for Competitive Advantage",
    description:
      "Before building, we understand. Our AI strategists work with your leadership team to identify high-impact opportunities, create implementation roadmaps, and establish success metrics that matter to your business.",
  },
  {
    label: "Custom AI Development",
    title: "Bespoke Intelligence, Built for Your Business",
    description:
      "Generic solutions deliver generic results. We craft AI systems that understand your unique challenges, speak your industry's language, and integrate seamlessly with your existing workflows.",
  },
  {
    label: "AI Integration & Automation",
    title: "Seamless Integration, Exponential Results",
    description:
      "The best AI implementations feel natural. We integrate intelligent automation into your existing systems, creating workflows that enhance human capability rather than replacing it.",
  },
  {
    label: "AI Training & Support",
    title: "Empowering Your Team for an AI-First Future",
    description:
      "Technology is only as powerful as the people who use it. We provide comprehensive training and ongoing support to ensure your team maximizes every AI investment.",
  },
];

export function ServicesStack() {
  const [active, setActive] = useState(3); // Start with last card on top

  const handleDotClick = (idx: number) => setActive(idx);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto bg-black/40 backdrop-blur-lg glass-card border-white/5 border rounded-3xl py-24 px-8 mt-8">
      {/* Left: Text & Dots */}
      <div className="flex-1 max-w-lg pr-8 md:pr-12 relative pb-16">
        <div className="flex items-center gap-2 text-secondary mb-6">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="uppercase text-xs font-medium tracking-wide">Our Services</span>
        </div>
        <h2 className="text-4xl font-medium tracking-tighter mb-6">Comprehensive AI Solutions for Every Stage of Your Journey</h2>
        <p className="text-base text-secondary mb-8">Whether you're taking your first steps into AI or scaling existing implementations, we meet you where you are and take you where you need to be.</p>
        <ul className="space-y-4 text-sm text-gray-200 mb-12 list-disc list-inside">
          <li>AI Strategy and Consulting</li>
          <li>Custom AI Development</li>
          <li>AI Integration and Automation</li>
          <li>AI Training and Support</li>
        </ul>
        {/* Arrow navigation at bottom left */}
        <div className="flex gap-6 mt-12 md:mt-0 md:absolute md:left-0 md:bottom-0 md:mb-4 md:ml-0">
          <button
            onClick={() => setActive((prev) => (prev - 1 + services.length) % services.length)}
            aria-label="Previous service"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setActive((prev) => (prev + 1) % services.length)}
            aria-label="Next service"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      {/* Right: Card Stack */}
      <div className="relative w-full max-w-xs md:max-w-md min-h-[26rem] flex items-start justify-start md:pl-4">
        {services.map((service, i) => {
          // Calculate stack order
          const order = (i - active + services.length) % services.length;
          const isTop = order === 0;
          return (
            <motion.div
              key={service.title}
              className={cn(
                "absolute top-0 left-0 w-full h-96 rounded-2xl shadow-2xl cursor-grab select-none flex flex-col transition-all",
                isTop
                  ? "bg-black/40 backdrop-blur-lg glass-card z-10"
                  : "bg-black/40 backdrop-blur-lg glass-card z-0"
              )}
              style={{
                translate: isTop ? "0 0" : `${order * -32}px 0`,
                scale: isTop ? 1 : 0.94,
                opacity: isTop ? 1 : 0.3,
                filter: isTop ? "none" : "blur(1px)",
                transition: "all 0.9s cubic-bezier(.4,2,.6,1)",
              }}
              tabIndex={0}
              onClick={() => setActive(i)}
              aria-label={service.title}
            >
              {isTop && (
                <div className="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-gradient-to-b from-primary-500/80 to-primary-400/40 shadow-lg z-20" />
              )}
              <div className="h-full flex flex-col p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs uppercase tracking-wide text-secondary font-medium">{service.label}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 uppercase">{service.title}</h3>
                <p className="text-secondary mb-6 flex-1">{service.description}</p>
                {isTop && (
                  <RainbowButton className="w-full py-3 px-4 rounded-lg text-white mt-auto">
                    Learn More
                  </RainbowButton>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

{/* Services Cards */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
    <p className="text-xl text-secondary mb-12">Expertise That Drives Quality</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-start text-left">
        <h3 className="text-2xl font-semibold mb-4">Plan & Organize</h3>
        <p className="text-base text-neutral-200 mb-6">We enhance efficiency by integrating apps and reducing downtime.</p>
      </div>
      <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-start text-left">
        <h3 className="text-2xl font-semibold mb-4">Custom Projects</h3>
        <p className="text-base text-neutral-200 mb-6">We created a versatile chatbot that understands diverse questions.</p>
      </div>
      <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-start text-left">
        <h3 className="text-2xl font-semibold mb-4">Smart Automation</h3>
        <p className="text-base text-neutral-200 mb-6">We analyze operations and suggest AI solutions to boost efficiency.</p>
      </div>
    </div>
  </div>
</section> 