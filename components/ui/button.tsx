import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from 'lucide-react'

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform transition-transform duration-150 active:scale-95 hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children: React.ReactNode
  noArrow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, noArrow = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const showArrow = !noArrow
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'group')}
        ref={ref}
        {...props}
      >
        <span className="inline-flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 opacity-60" />
          )}
        </span>
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

const badgeColors: Record<string, string> = {
  orange: 'bg-orange-500 text-black',
  violet: 'bg-violet-500 text-white',
  blue: 'bg-blue-500 text-white',
  emerald: 'bg-emerald-500 text-white',
  pink: 'bg-pink-500 text-white',
  yellow: 'bg-yellow-400 text-black',
  default: 'bg-white/10 text-white border border-white/20 backdrop-blur-sm',
};

interface BadgeProps {
  children: React.ReactNode;
  color?: keyof typeof badgeColors | string;
  className?: string;
  mini?: boolean;
}

export function Badge({ children, color = 'default', className = '', mini = false }: BadgeProps) {
  const sizeClass = mini ? 'px-2 py-0.5 text-xs font-semibold' : 'px-4 py-2 text-xs font-semibold';
  return (
    <span className={`rounded-full ${sizeClass} tracking-wider ${badgeColors[color as keyof typeof badgeColors] || badgeColors.default} ${className} transform transition-transform duration-150 active:scale-95 hover:scale-105`}>
      {children}
    </span>
  );
} 