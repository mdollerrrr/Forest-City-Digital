import * as React from "react"
import { cn } from "@/lib/utils"

export interface FullWidthStripProps extends React.HTMLAttributes<HTMLElement> {
  /** Inner content - use Container inside for constrained width, or leave full width */
  children: React.ReactNode
  /** Background: muted (default), primary, or transparent */
  variant?: "muted" | "primary" | "transparent"
  /** Vertical padding */
  padding?: "compact" | "default"
  className?: string
}

const variantClasses = {
  muted: "bg-muted/50 border-y border-border",
  primary: "bg-primary text-primary-foreground border-y border-primary/20",
  transparent: "",
}

/**
 * Full-width strip across the viewport. Use for trust bar, emergency CTA, or dividers.
 */
export const FullWidthStrip = React.forwardRef<HTMLElement, FullWidthStripProps>(
  function FullWidthStrip(
    { children, variant = "muted", padding = "default", className, ...props },
    ref
  ) {
    return (
      <section
        ref={ref}
        className={cn(
          variantClasses[variant],
          padding === "compact" && "py-4",
          padding === "default" && "py-5",
          padding === "default" && variant === "primary" && "py-12",
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
)
