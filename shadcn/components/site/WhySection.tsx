import { Zap, Smartphone, Target, Headphones } from "lucide-react"

import { Container } from "./Container"

const ITEMS = [
  {
    title: "Fast Turnaround",
    description: "Most websites completed in 1–2 weeks",
    Icon: Zap,
  },
  {
    title: "Mobile-First",
    description: "Every site optimized for mobile devices",
    Icon: Smartphone,
  },
  {
    title: "Lead-Focused",
    description: "Designed to generate calls and bookings",
    Icon: Target,
  },
  {
    title: "Ongoing Support",
    description: "Maintenance plans so you never worry",
    Icon: Headphones,
  },
] as const

export function WhySection() {
  return (
    <section className="border-b border-[var(--border-color)] bg-white py-16 sm:py-20">
      <Container>
        <h2
          className="text-center text-2xl font-bold text-[var(--text-dark)] sm:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Why Choose Us
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ title, description, Icon }) => (
            <div
              key={title}
              data-reveal
              className="flex flex-col items-center text-center"
            >
              <span
                className="flex size-16 items-center justify-center rounded-2xl bg-[var(--bg-light)] text-[var(--primary-color)]"
                aria-hidden
              >
                <Icon className="size-8" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-dark)]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-light)] sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
