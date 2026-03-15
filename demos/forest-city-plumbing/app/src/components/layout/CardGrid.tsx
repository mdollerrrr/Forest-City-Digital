import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardGridProps {
  children: React.ReactNode
  /** Columns: 2 or 3 on lg */
  columns?: 2 | 3
  className?: string
  gridRef?: React.RefObject<HTMLDivElement | null>
}

/**
 * Responsive card grid. Use for services, features, or any uniform cards.
 */
export function CardGrid({
  children,
  columns = 3,
  className,
  gridRef,
}: CardGridProps) {
  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 2 && "lg:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  )
}
