import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/Container"

export interface SplitSectionProps {
  /** Left column content */
  left: React.ReactNode
  /** Right column content */
  right: React.ReactNode
  /** Swap columns on desktop (right becomes left) */
  reverse?: boolean
  /** Align items: start, center, end */
  align?: "start" | "center" | "end"
  /** Gap between columns */
  gap?: "default" | "large"
  className?: string
  /** Section element id */
  id?: string
}

/**
 * Two-column split layout. Responsive: stacks on mobile, side-by-side on lg.
 * Use for hero, why choose us, or any text + visual split.
 */
export function SplitSection({
  left,
  right,
  reverse = false,
  align = "center",
  gap = "default",
  className,
  id,
}: SplitSectionProps) {
  return (
    <Container
      id={id}
      className={cn(
        "flex flex-col gap-12 py-16 lg:flex-row lg:gap-16",
        align === "start" && "lg:items-start",
        align === "center" && "lg:items-center",
        align === "end" && "lg:items-end",
        gap === "large" && "lg:gap-20",
        reverse && "lg:flex-row-reverse",
        className
      )}
    >
      <div className="flex-1 min-w-0">{left}</div>
      <div className="flex-1 min-w-0 shrink-0">{right}</div>
    </Container>
  )
}
