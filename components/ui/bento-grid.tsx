import React from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from '@/components/ui/button'

// Card Props
export interface BentoCardProps {
  Icon?: React.ElementType;
  name: string;
  description: string;
  href?: string;
  className?: string;
  background?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  Icon,
  name,
  description,
  href,
  background,
  className = "",
}) => (
  <div className={`relative overflow-hidden rounded-2xl shadow-xl border border-white/10 glass-card bg-black/40 backdrop-blur-lg min-h-[320px] flex flex-col justify-end transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_12px_32px_0_rgba(0,0,0,0.45)] ${className}`}>
    {/* Full background image */}
    <div className="absolute inset-0 w-full h-full z-0">
      {/* Force any image to cover the card */}
      {background &&
        React.isValidElement(background)
          ? React.cloneElement(background as React.ReactElement, {
              className: "absolute inset-0 w-full h-full object-cover",
              style: { objectFit: "cover" },
            })
          : background}
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg z-10" />
    </div>
    {/* Card Content */}
    <div className="relative z-20 p-8 flex flex-col h-full justify-end">
      {Icon && (
        <span className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
          <Icon className="w-6 h-6 text-white" />
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2 text-white uppercase">{name}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      {href && (
        <RainbowButton asChild className="mt-auto">
          <a href={href}>Explore Case Study</a>
        </RainbowButton>
      )}
    </div>
  </div>
);

// Grid Props
export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>{children}</div>
);
 