import React from "react";
import { Badge } from '@/components/ui/button'

interface MainServicesCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

const features = [
  {
    icon: (
      <div className="bg-indigo-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-all">
        <svg className="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    ),
    title: "Global Connectivity",
    description:
      "Connect teams across borders with real-time collaboration tools designed for distributed workforces.",
  },
  {
    icon: (
      <div className="bg-purple-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
        <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    ),
    title: "Intelligent Automation",
    description:
      "Streamline workflows with AI-powered automation that learns and adapts to your team's unique processes.",
  },
  {
    icon: (
      <div className="bg-blue-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
        <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    ),
    title: "Advanced Analytics",
    description:
      "Gain actionable insights with customizable dashboards that visualize your most important metrics.",
  },
  {
    icon: (
      <div className="bg-green-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all">
        <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
    ),
    title: "Enterprise Security",
    description:
      "Protect sensitive data with bank-level encryption and compliance frameworks that meet global standards.",
  },
  {
    icon: (
      <div className="bg-pink-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-all">
        <svg className="h-6 w-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    title: "Team Collaboration",
    description:
      "Foster seamless teamwork with integrated communication tools, file sharing, and project management.",
  },
  {
    icon: (
      <div className="bg-amber-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all">
        <svg className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      </div>
    ),
    title: "Scalable Infrastructure",
    description:
      "Grow with confidence on a platform designed to handle enterprise-level demands with zero downtime.",
  },
];

const MainServicesCard: React.FC<MainServicesCardProps> = ({
  title = (
    <>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Powerful features</span> for modern teams
    </>
  ),
  subtitle = (
    <>Everything you need to connect, manage, and scale your global operations with unprecedented efficiency.</>
  ),
  buttonText = "Explore all features",
  onButtonClick,
}) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">{title}</h2>
          <p className="text-secondary text-xl max-w-2xl mx-auto font-extralight">{subtitle}</p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="glass-card p-8 rounded-xl border border-white/10 shadow-xl transition-all group backdrop-blur-lg bg-white/10"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-2 uppercase">{feature.title}</h3>
              <p className="text-secondary font-extralight leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServicesCard; 