"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { business } from "@/config/business"
import { staggerCards, killStaggerScrollTriggers } from "@/animations/staggerCards"
import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/Section"
import { SplitSection } from "@/components/layout/SplitSection"
import { SectionHeading } from "./SectionHeading"

export function WhyChooseUs() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-why-card]")
    if (!cards?.length) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    staggerCards(cards, { trigger: sectionRef.current, y: 28, duration: 0.45, stagger: 0.1, start: "top 85%" })
    return killStaggerScrollTriggers
  }, [])

  const left = (
    <div className="lg:sticky lg:top-24">
      <SectionHeading
        kicker="WHY CHOOSE US"
        title="Trustworthy, professional, and easy to work with."
        description="Clear communication, upfront pricing, and quality workmanship—so you can get back to your day with confidence."
      />
      <p className="mt-6 text-sm text-muted-foreground max-w-md">
        We treat every job like it's our own home. No upsells, no surprises—just clear quotes and quality work.
      </p>
    </div>
  )

  const right = (
    <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
      {business.whyChooseUs.map((item, i) => (
        <Card
          key={i}
          data-why-card
          className={cn(
            "card-premium h-full rounded-2xl bg-card",
            "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          )}
        >
          <CardHeader className="space-y-3">
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <CheckCircle2 className="size-5" />
            </div>
            <CardTitle className="text-base text-foreground">{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  )

  return (
    <Section id="about" ref={sectionRef} variant="muted">
      <SplitSection left={left} right={right} align="start" />
    </Section>
  )
}
