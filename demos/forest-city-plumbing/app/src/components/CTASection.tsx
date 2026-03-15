"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"
import { business } from "@/config/business"
import { scrollReveal } from "@/animations/scrollReveal"
import { ctaPulse } from "@/animations/ctaPulse"
import { Container } from "./Container"
import { LinkButton } from "./LinkButton"
import { Section } from "@/components/layout/Section"

export function CTASection() {
  const tel = business.phone.replace(/[^\d+]/g, "")
  const sectionRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const ctaRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanupReveal = scrollReveal(contentRef.current, { trigger: sectionRef.current })
    return () => { cleanupReveal?.() }
  }, [])

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanup = ctaPulse(ctaRef.current, { scale: 1.02, duration: 2.2 })
    return () => { cleanup?.() }
  }, [])

  return (
    <Section id="contact" ref={sectionRef} variant="muted">
      <Container>
        <div ref={contentRef} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            READY WHEN YOU ARE
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Need a pro today?
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            Book fast service, get a clear quote, and have the job done right.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton ref={ctaRef} href="#contact" className="h-12 px-7 text-base shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
              {business.ctaPrimary}
            </LinkButton>
            <LinkButton
              href={`tel:${tel}`}
              variant="outline"
              className="h-12 gap-2 px-7 text-base border-border"
            >
              <PhoneCall className="size-5" />
              {business.ctaSecondary}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  )
}
