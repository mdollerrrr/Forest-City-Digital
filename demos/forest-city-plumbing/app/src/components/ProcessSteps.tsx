"use client"

import * as React from "react"
import { business } from "@/config/business"
import { staggerCards, killStaggerScrollTriggers } from "@/animations/staggerCards"
import { Container } from "./Container"
import { Section } from "@/components/layout/Section"
import { Timeline } from "@/components/layout/Timeline"
import { SectionHeading } from "./SectionHeading"

export function ProcessSteps() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const stepsRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const steps = stepsRef.current?.querySelectorAll("[data-process-step]")
    if (!steps?.length) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    staggerCards(steps, {
      trigger: sectionRef.current,
      y: 24,
      duration: 0.4,
      stagger: 0.12,
      start: "top 82%",
    })
    return killStaggerScrollTriggers
  }, [])

  const heading = (
    <SectionHeading
      kicker="PROCESS"
      title="Simple 3-step process."
      description="Fast answers, clear next steps, and a professional fix—without the hassle."
    />
  )

  return (
    <Section ref={sectionRef} variant="default">
      <Container>
        <Timeline
          heading={heading}
          steps={business.processSteps}
          stepsRef={stepsRef}
        />
      </Container>
    </Section>
  )
}
