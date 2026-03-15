import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"

const CARDS = [
  {
    title: "Trades",
    description:
      "Electricians, plumbers, HVAC, roofers, landscapers, and other service pros.",
    points: [
      "Click-to-call + quote forms",
      "Service areas + trust sections",
      "Built for mobile and speed",
    ],
    accent: false,
    cta: null,
  },
  {
    title: "Local Small Businesses",
    description:
      "Auto shops, clinics, local services — businesses that rely on local customers.",
    points: [
      "Clear messaging + strong CTAs",
      "Basic local SEO setup",
      "Lead-focused layout",
    ],
    accent: false,
    cta: null,
  },
  {
    title: "New business? No problem.",
    description:
      "We're new — but your site won't look new. You'll get a modern, credible website you can confidently send people to.",
    accent: true,
    cta: { label: "See examples", href: "/portfolio" },
    points: [],
  },
] as const

export function WhoForSection() {
  return (
    <section
      id="whofor"
      className="border-b border-[var(--border-color)] bg-[var(--bg-light)] py-20"
      aria-label="Who this is for"
    >
      <Container>
        <h2
          className="text-center text-3xl font-bold text-[var(--text-dark)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Who This Is For
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--text-light)]">
          We specialize in trades and local small businesses that need more
          calls, quotes, and bookings.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <Card
              key={card.title}
              data-reveal
              className={
                card.accent
                  ? "border-[var(--primary-color)]/30 bg-white shadow-md"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-[var(--text-light)]">{card.description}</p>
                {card.points.length > 0 && (
                  <ul className="list-inside list-disc space-y-1 text-sm text-[var(--text-light)]">
                    {card.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {card.cta && (
                  <Button href={card.cta.href} variant="secondary" size="default">
                    {card.cta.label}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
