"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import { business } from "@/config/business"
import { scrollReveal } from "@/animations/scrollReveal"
import { cn } from "@/lib/utils"
import { Container } from "./Container"
import { FullWidthStrip } from "@/components/layout/FullWidthStrip"

export function TrustBar() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanup = scrollReveal(contentRef.current, { trigger: sectionRef.current, y: 12 })
    return cleanup ?? undefined
  }, [])

  return (
    <FullWidthStrip ref={sectionRef} variant="muted" padding="default">
      <Container>
        <div ref={contentRef} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {business.trustBar.map((label, i) => (
            <div key={i} className={cn("flex items-center gap-2 text-sm font-medium text-foreground", "transition-colors hover:text-primary")}>
              <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
              <span className="sm:inline">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </FullWidthStrip>
  )
}
