"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Subtle glow on hover */
  glow?: boolean
  children: React.ReactNode
}

/**
 * Card with Motion hover elevation and optional glow. GPU-friendly.
 */
export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  function AnimatedCard({ glow, className, children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "card-premium rounded-2xl bg-card",
          glow && "shadow-primary/5 hover:shadow-primary/10",
          className
        )}
        initial={false}
        whileHover={{
          y: -2,
          transition: { duration: 0.2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    )
  }
)
