import * as React from "react"
import { cn } from "@/lib/utils"

export type SectionVariant = "default" | "muted" | "muted-strong" | "card"

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted/20",
  "muted-strong": "bg-muted/40",
  card: "bg-card",
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant
  noBorder?: boolean
  padding?: "default" | "compact" | "none"
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    { variant = "default", noBorder, padding = "default", className, ...props },
    ref
  ) {
    return (
      <section
        ref={ref}
        className={cn(
          variantClasses[variant],
          !noBorder && "border-t border-border",
          padding === "default" && "py-20",
          padding === "compact" && "py-12",
          className
        )}
        {...props}
      />
    )
  }
)
