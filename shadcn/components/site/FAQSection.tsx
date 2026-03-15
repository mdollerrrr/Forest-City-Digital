"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Container } from "./Container"

const FAQ_ITEMS = [
  {
    q: "How long does a typical website take?",
    a: "Most projects take 1–2 weeks depending on pages, photos, and how quickly we get feedback.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A quick questionnaire, your logo (if you have one), a list of services, service areas, and any photos you want included. If you don't have photos, we'll recommend simple options.",
  },
  {
    q: "What's included in the build?",
    a: "Mobile-first design, click-to-call + lead forms, basic local SEO setup, and a layout built to convert visitors into calls and quotes.",
  },
  {
    q: "How many edits do I get?",
    a: "We do a focused review round after the first draft, then a final polish pass. The goal is to ship fast without endless back-and-forth.",
  },
  {
    q: "Do you offer hosting and maintenance?",
    a: "Yes — if you want to be worry-free, we can handle hosting, updates, backups, and ongoing edits through a care plan.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. If you ever want to take it over, we can hand everything off. (We'll outline the handover fee clearly up front.)",
  },
] as const

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="border-b border-[var(--border-color)] bg-[var(--bg-light)] py-20"
      aria-label="Frequently asked questions"
    >
      <Container>
        <h2
          className="text-center text-3xl font-bold text-[var(--text-dark)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FAQ
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--text-light)]">
          Clear answers so you know exactly what you're getting.
        </p>

        <div className="mx-auto mt-10 max-w-2xl space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={item.q}
              data-reveal
              className="rounded-xl border border-[var(--border-color)] bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[var(--text-dark)]"
              >
                {item.q}
                <span className="text-[var(--text-light)]">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="border-t border-[var(--border-color)] px-5 py-4 text-sm text-[var(--text-light)]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-[var(--border-color)] bg-white p-8 text-center">
          <h3 className="text-xl font-semibold text-[var(--text-dark)]">
            Want to see examples?
          </h3>
          <p className="mt-2 text-[var(--text-light)]">
            Check out demos and real previews — then we'll build one tailored to
            your business.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/portfolio" variant="secondary">
              View Portfolio
            </Button>
            <Button href="/contact" variant="default">
              Get a Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
