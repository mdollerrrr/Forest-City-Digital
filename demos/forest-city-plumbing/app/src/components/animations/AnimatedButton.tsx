"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "outline" | "ghost"
  size?: "default" | "lg"
  children: React.ReactNode
  className?: string
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
const variants = {
  primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
  outline: "border-2 border-border bg-transparent hover:bg-muted hover:border-primary/50",
  ghost: "bg-transparent hover:bg-muted",
}
const sizes = { default: "h-11 px-6 text-sm", lg: "h-12 px-7 text-base" }

export function AnimatedButton({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <motion.span
        className="inline-flex items-center justify-center gap-2"
        initial={false}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.span>
    </a>
  )
}
