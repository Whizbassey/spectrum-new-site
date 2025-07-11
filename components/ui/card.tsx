import React, { useRef, useEffect } from "react";

import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/button'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-black/40 backdrop-blur-lg glass-card text-card-foreground shadow-sm transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_12px_32px_0_rgba(0,0,0,0.45)]",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-secondary", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  cta?: React.ReactNode;
  meta?: { left: string; right: string };
  children?: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  cta,
  meta,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = containerRef.current;
    if (!canvas || !card) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = card.offsetWidth;
      canvas.height = card.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    let width = canvas.width;
    let height = canvas.height;
    let halfWidth = width / 2;
    let halfHeight = height / 2;
    const lineCount = 40;
    const color = "#FF694B";
    const offset = Math.PI * 3.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    function Line(this: any, pos: number) { this.pos = pos; }
    Line.prototype = {
      constructor: Line,
      pos: 0,
      width: halfWidth,
      height: 4,
      range: halfHeight * 0.9,
      render: function (ctx: CanvasRenderingContext2D, delta: number) {
        const pos = this.pos;
        const minWidth = this.width * 0.25;
        const lineWidth = minWidth + this.width * 0.75 * pos;
        const lineHeight = Math.cos(delta + pos * offset) * this.height;
        const x = (width - minWidth) * (1 - pos);
        const y = (Math.sin(delta + pos * offset) * (this.range / 2 + this.range / 2 * pos)) + halfHeight;
        ctx.globalAlpha = 0.3 + 0.65 * (1 - pos);
        ctx.beginPath();
        ctx.rect(x, y, lineWidth, lineHeight);
        ctx.closePath();
        ctx.fill();
      },
    };
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      lines.push(new (Line as any)(i / lineCount));
    }
    let wave = 0;
    let animationFrame: number;
    function render() {
      animationFrame = requestAnimationFrame(render);
      wave += 0.02;
      width = canvas.width;
      height = canvas.height;
      halfWidth = width / 2;
      halfHeight = height / 2;
      ctx.clearRect(0, 0, width, height);
      lines.forEach((line: any) => line.render(ctx, wave));
    }
    render();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="card-container relative overflow-hidden w-full max-w-xl bg-black/40 backdrop-blur-lg glass-card rounded-xl shadow-2xl border border-white/10"
      style={{ minHeight: 380 }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="card-content relative z-10 p-8 text-white flex flex-col h-full">
        <h2 className="text-2xl font-semibold mb-4 uppercase">{title}</h2>
        <p className="text-secondary mb-6">{description}</p>
        {features && (
          <ul className="text-sm text-white/70 mb-6 list-disc list-inside space-y-1">
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        )}
        {children}
        {cta && <div className="flex items-center space-x-4 mb-4">{cta}</div>}
        {meta && (
          <div className="border-t border-white/10 mt-6 pt-4">
            <div className="flex justify-between text-white/70">
              <span>{meta.left}</span>
              <span>{meta.right}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 