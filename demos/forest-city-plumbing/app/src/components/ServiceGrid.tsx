"use client"

import * as React from "react"
import { Wrench } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { business } from "@/config/business"
import { staggerCards, killStaggerScrollTriggers } from "@/animations/staggerCards"
import { hoverLift } from "@/animations/hoverLift"
import { cn } from "@/lib/utils"
import { Container } from "./Container"
import { SectionHeading } from "./SectionHeading"
import { Section } from "@/components/layout/Section"
import { CardGrid } from "@/components/layout/CardGrid"

export function ServiceGrid() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll("[data-service-card]")
    if (!cards?.length) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    staggerCards(cards, {
      trigger: sectionRef.current,
      y: 32,
      duration: 0.45,
      stagger: 0.08,
      start: "top 82%",
    })
    const cleanupHover = hoverLift(cards, { y: -2, duration: 0.2 })
    return () => {
      killStaggerScrollTriggers()
      cleanupHover?.()
    }
  }, [])

  return (
    <Section id="services" ref={sectionRef} variant="default">
      <Container>
        <div className="flex flex-col gap-12">
          <SectionHeading
            kicker="SERVICES"
            title="Residential + commercial, handled fast."
            description="From urgent emergencies to planned installs—our technicians show up on time, diagnose accurately, and fix it right."
          />
          <CardGrid gridRef={gridRef} columns={3}>
            {business.services.map((name, i) => (
              <Card
                key={i}
                data-service-card
                className={cn(
                  "card-premium group h-full rounded-2xl bg-card",
                  "transition-shadow duration-200 hover:shadow-md"
                )}
              >
                <CardHeader className="space-y-3">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                    <Wrench className="size-5" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Professional {name.toLowerCase()} for your home or business.
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardGrid>
        </div>
      </Container>
    </Section>
  )
}
