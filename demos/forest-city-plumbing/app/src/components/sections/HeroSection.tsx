"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"
import { business } from "@/config/business"
import { heroEntrance } from "@/animations/heroEntrance"
import { Section } from "@/components/layout/Section"
import { SplitSection } from "@/components/layout/SplitSection"
import { FloatingBackground } from "@/components/animations/FloatingBackground"
import { AnimatedButton } from "@/components/animations/AnimatedButton"
import { AnimatedCard } from "@/components/animations/AnimatedCard"
import { cn } from "@/lib/utils"

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
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {business.name}
      </p>
      <h1
        ref={headlineRef}
        className={cn(
          "mt-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
          "text-gradient-hero"
        )}
      >
        {business.tagline}
      </h1>
      <p
        ref={subRef}
        className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
      >
        {business.subheadline}
      </p>
      <div
        ref={ctaRef}
        className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
      >
        <AnimatedButton href={`tel:${tel}`} variant="primary" size="lg" className="gap-2">
          <PhoneCall className="size-5" />
          {business.ctaSecondary}
        </AnimatedButton>
        <AnimatedButton href="#contact" variant="outline" size="lg">
          {business.ctaPrimary}
        </AnimatedButton>
      </div>
    </div>
  )

  const right = (
    <div
      ref={rightRef}
      className="flex w-full max-w-md flex-col gap-4 lg:max-w-sm mx-auto lg:mx-0"
    >
      <AnimatedCard data-hero-card className="card-premium rounded-2xl bg-card p-5">
        <p className="text-sm font-semibold text-foreground">Same-day available</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Many appointments same or next day.
        </p>
      </AnimatedCard>
      <AnimatedCard data-hero-card className="card-premium rounded-2xl bg-card p-5">
        <p className="text-sm font-semibold text-foreground">Upfront pricing</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Clear quotes before we start work.
        </p>
      </AnimatedCard>
      <AnimatedCard data-hero-card className="card-premium rounded-2xl bg-card p-5">
        <p className="text-sm font-semibold text-foreground">Licensed & insured</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Professional, code-compliant service.
        </p>
      </AnimatedCard>
    </div>
  )

  return (
    <Section
      id="home"
      variant="default"
      noBorder
      padding="none"
      className="relative min-h-[92vh] overflow-hidden"
    >
      <FloatingBackground animated />
      <div
        className="absolute inset-0 -z-10 hero-glow"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_80%_at_70%_20%,var(--primary)_0%,transparent_50%),radial-gradient(ellipse_80%_50%_at_20%_80%,var(--primary)_0%,transparent_40%)] opacity-[0.06]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden />
      <SplitSection
        left={left}
        right={right}
        gap="large"
        className="relative z-0 min-h-[92vh] py-24 lg:py-32"
      />
    </Section>
  )
}
