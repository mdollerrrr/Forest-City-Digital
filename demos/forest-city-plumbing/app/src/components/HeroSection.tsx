"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"
import { business } from "@/config/business"
import { heroEntrance } from "@/animations/heroEntrance"
import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/Section"
import { SplitSection } from "@/components/layout/SplitSection"
import { LinkButton } from "./LinkButton"

export function HeroSection() {
  const tel = React.useMemo(
    () => business.phone.replace(/[^\d+]/g, ""),
    []
  )
  const headlineRef = React.useRef<HTMLHeadingElement>(null)
  const subRef = React.useRef<HTMLParagraphElement>(null)
  const ctaRef = React.useRef<HTMLDivElement>(null)
  const rightRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const cards = rightRef.current?.querySelectorAll("[data-hero-card]")
    const tl = heroEntrance({
      headline: headlineRef.current,
      subheadline: subRef.current,
      cta: ctaRef.current,
      cards: cards?.length ? Array.from(cards) : null,
    })
    return () => { tl.kill() }
  }, [])

  const left = (
    <div className="text-center lg:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {business.name}
      </p>
      <h1
        ref={headlineRef}
        className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        {business.tagline}
      </h1>
      <p
        ref={subRef}
        className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground"
      >
        {business.subheadline}
      </p>
      <div
        ref={ctaRef}
        className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
      >
        <LinkButton
          href={`tel:${tel}`}
          className="h-12 gap-2 px-7 text-base shadow-md transition-all hover:shadow-lg"
        >
          <PhoneCall className="size-5" />
          {business.ctaSecondary}
        </LinkButton>
        <LinkButton
          href="#contact"
          variant="outline"
          className="h-12 px-7 text-base"
        >
          {business.ctaPrimary}
        </LinkButton>
      </div>
    </div>
  )

  const right = (
    <div
      ref={rightRef}
      className="flex w-full max-w-md flex-col gap-3 lg:max-w-sm mx-auto lg:mx-0"
    >
          <div
            data-hero-card
            className={cn(
              "rounded-2xl border border-border bg-card p-5 shadow-md",
              "transition-shadow hover:shadow-lg"
            )}
          >
            <p className="text-sm font-semibold text-foreground">Same-day available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Many appointments same or next day.
            </p>
          </div>
          <div
            data-hero-card
            className={cn(
              "rounded-2xl border border-border bg-card p-5 shadow-md",
              "transition-shadow hover:shadow-lg"
            )}
          >
            <p className="text-sm font-semibold text-foreground">Upfront pricing</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Clear quotes before we start work.
            </p>
          </div>
          <div
            data-hero-card
            className={cn(
              "rounded-2xl border border-border bg-card p-5 shadow-md",
              "transition-shadow hover:shadow-lg"
            )}
          >
            <p className="text-sm font-semibold text-foreground">Licensed & insured</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Professional, code-compliant service.
            </p>
          </div>
    </div>
  )

  return (
    <Section
      id="home"
      variant="default"
      noBorder
      padding="none"
      className="relative min-h-[90vh] overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.04]"
        aria-hidden
      />
      <SplitSection
        left={left}
        right={right}
        gap="large"
        className="min-h-[90vh] py-16 lg:py-24"
      />
    </Section>
  )
}
