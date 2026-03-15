"use client"

import * as React from "react"
import { MapPin } from "lucide-react"
import { business } from "@/config/business"
import { scrollReveal } from "@/animations/scrollReveal"
import { Container } from "./Container"
import { LinkButton } from "./LinkButton"
import { Section } from "@/components/layout/Section"
import { ListSection } from "@/components/layout/ListSection"
import { SectionHeading } from "./SectionHeading"

export function ServiceArea() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanup = scrollReveal(contentRef.current, { trigger: sectionRef.current })
    return cleanup ?? undefined
  }, [])

  const heading = (
    <SectionHeading
      kicker="SERVICE AREA"
      title="Local coverage, fast arrival."
      description={"We serve " + business.city + " and nearby cities with fast response times and reliable scheduling."}
    />
  )

  const footer = (
    <p className="text-sm text-muted-foreground">
      Not listed? We may still cover your area—{" "}
      <LinkButton
        href="#contact"
        variant="link"
        className="inline-flex h-auto p-0 text-base font-medium underline-offset-4"
      >
        get in touch
      </LinkButton>
      {" "}and we will confirm.
    </p>
  )

  const aside = (
    <div className="card-premium rounded-2xl bg-card p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <MapPin className="size-4" />
        Coverage
      </h3>
      <div className="mt-4 aspect-[16/9] w-full rounded-lg border border-border bg-muted/40" />
      <p className="mt-4 text-sm text-muted-foreground">
        We cover {business.serviceAreas.slice(0, 3).join(", ")} and surrounding
        communities. Emergency and same-day slots depend on availability—call or
        request a quote to get on the schedule.
      </p>
    </div>
  )

  return (
    <Section id="service-area" ref={sectionRef} variant="muted">
      <Container className="py-20">
        <ListSection
          heading={heading}
          items={business.serviceAreas}
          columns={2}
          footer={footer}
          aside={aside}
          contentRef={contentRef}
        />
      </Container>
    </Section>
  )
}
