"use client"

import * as React from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"

export interface SectionRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vertical offset for reveal (px) */
  y?: number
  /** Animation duration */
  duration?: number
  /** ScrollTrigger start */
  start?: string
}

/**
 * Wraps section content and reveals it on scroll (GSAP ScrollTrigger).
 */
export const SectionReveal = React.forwardRef<HTMLDivElement, SectionRevealProps>(
  function SectionReveal(
    { y = 40, duration = 0.6, start = "top 85%", className, children, ...props },
    forwardedRef
  ) {
    const scrollRevealRef = useScrollReveal<HTMLDivElement>({ y, duration, start })
    const setRef = (el: HTMLDivElement | null) => {
      (scrollRevealRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      if (typeof forwardedRef === "function") forwardedRef(el)
      else if (forwardedRef) forwardedRef.current = el
    }
    return (
      <div ref={setRef} className={cn(className)} {...props}>
        {children}
      </div>
    )
  }
)
