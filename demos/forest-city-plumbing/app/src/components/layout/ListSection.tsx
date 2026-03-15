import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListSectionProps {
  /** Section heading (kicker, title, description) */
  heading: React.ReactNode
  /** List items (e.g. city names) */
  items: readonly string[]
  /** Number of columns on desktop: 1, 2, or 3 */
  columns?: 1 | 2 | 3
  /** Optional footer text below the list */
  footer?: React.ReactNode
  /** Optional right column (e.g. map placeholder, extra copy) */
  aside?: React.ReactNode
  className?: string
  contentRef?: React.RefObject<HTMLDivElement | null>
}

/**
 * Section built around a list (e.g. service areas). Optional aside for map or extra content.
 */
export function ListSection({
  heading,
  items,
  columns = 2,
  footer,
  aside,
  className,
  contentRef,
}: ListSectionProps) {
  return (
    <div ref={contentRef} className={cn("flex flex-col gap-10", className)}>
      {heading}
      <div className={aside ? "grid gap-10 lg:grid-cols-5 lg:gap-12" : ""}>
        <div className={aside ? "lg:col-span-2" : ""}>
          <ul
            className={cn(
              "grid gap-0 text-sm",
              columns === 1 && "grid-cols-1",
              columns === 2 && "sm:grid-cols-2",
              columns === 3 && "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border-b border-border/60 py-3 last:border-0"
              >
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          {footer && <div className="mt-6">{footer}</div>}
        </div>
        {aside && <div className="lg:col-span-3">{aside}</div>}
      </div>
    </div>
  )
}
