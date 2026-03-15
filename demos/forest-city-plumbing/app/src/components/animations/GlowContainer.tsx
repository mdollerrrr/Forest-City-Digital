"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow color: primary, accent, or custom class (e.g. bg-primary/20) */
  glow?: "primary" | "accent" | "muted"
  /** Size of the glow blur */
  size?: "sm" | "md" | "lg"
  /** Whether the glow is animated (subtle pulse) */
  animated?: boolean
}

const glowSizes = {
  sm: "before:blur-3xl before:opacity-30",
  md: "before:blur-[100px] before:opacity-40",
  lg: "before:blur-[120px] before:opacity-50",
}

const glowColors = {
  primary: "before:bg-primary",
  accent: "before:bg-accent",
  muted: "before:bg-muted-foreground/20",
}

/**
 * Wraps content with a soft glow behind it. Use for hero or section emphasis.
 */
export const GlowContainer = React.forwardRef<HTMLDivElement, GlowContainerProps>(
  function GlowContainer(
    { glow = "primary", size = "lg", animated, className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative isolate",
          "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
          "before:content-[''] before:pointer-events-none",
          glowColors[glow],
          glowSizes[size],
          animated && "before:animate-pulse-slow",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
