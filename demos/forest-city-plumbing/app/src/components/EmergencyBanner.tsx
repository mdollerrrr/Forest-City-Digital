"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"
import { business } from "@/config/business"
import { scrollReveal } from "@/animations/scrollReveal"
import { cn } from "@/lib/utils"
import { Container } from "./Container"
import { FullWidthStrip } from "@/components/layout/FullWidthStrip"

export function EmergencyBanner() {
  const tel = business.phone.replace(/[^\d+]/g, "")
  const sectionRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanup = scrollReveal(contentRef.current, { trigger: sectionRef.current, y: 16 })
    return cleanup ?? undefined
  }, [])

  return (
    <FullWidthStrip
      ref={sectionRef}
      variant="primary"
      padding="default"
      className="relative overflow-hidden"
      aria-label="Emergency service"
    >
      <div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, hsl(0 0% 100% / 0.15), transparent)",
        }}
      />
      <Container>
        <div ref={contentRef} className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Need service now?
            </h2>
            <p className="mt-1 text-sm opacity-90">
              Call for same-day or emergency service.
            </p>
          </div>
          <a
            href={`tel:${tel}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-7 py-4 text-base font-semibold text-primary",
              "shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            )}
          >
            <PhoneCall className="size-5" />
            {business.phone}
          </a>
        </div>
      </Container>
    </FullWidthStrip>
  )
}
