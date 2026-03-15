"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { business } from "@/config/business"
import { scrollReveal } from "@/animations/scrollReveal"
import { Container } from "./Container"
import { LinkButton } from "./LinkButton"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "./SectionHeading"

export function FAQSection() {
  const tel = React.useMemo(
    () => business.phone.replace(/[^\d+]/g, ""),
    []
  )
  const sectionRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cleanup = scrollReveal(contentRef.current, { trigger: sectionRef.current })
    return cleanup ?? undefined
  }, [])

  return (
    <Section id="faq" ref={sectionRef} variant="default">
      <Container className="py-20">
        <div ref={contentRef} className="flex flex-col gap-10">
          <SectionHeading
            kicker="FAQ"
            title="Common questions."
            description="Quick answers about service, pricing, and coverage. Still have a question? Call or send a message."
          />

          <Accordion className="w-full max-w-3xl">
            {business.faqs.map((faq, i) => (
              <AccordionItem key={i} value={"faq-" + i}>
                <AccordionTrigger className="text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex flex-wrap gap-3">
            <LinkButton href="#contact" className="h-11 px-6 text-base bg-primary text-primary-foreground">
              {business.ctaPrimary}
            </LinkButton>
            <LinkButton
              href={"tel:" + tel}
              variant="outline"
              className="h-11 gap-2 px-6 text-base"
            >
              <PhoneCall className="size-4" />
              {business.ctaSecondary}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  )
}
