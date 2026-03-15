"use client"

import { useState, useRef, useLayoutEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(Flip)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "./Container"

const BUILD_PACKAGES = [
  {
    name: "Launch Pad",
    price: "Starting at $999",
    desc: "A fast, high-converting site to boost calls and quotes",
    features: [
      "1-page lead generator",
      "Copywriting included (questionnaire-based)",
      "Click-to-call + quote form",
      "Service areas + trust section",
      "Mobile-first",
      "Basic local SEO setup",
    ],
    featured: false,
  },
  {
    name: "Starter",
    price: "Starting at $1,999",
    desc: "Perfect for small businesses getting their first professional website",
    features: [
      "Up to 5 pages",
      "Template-based design",
      "Contact forms",
      "Basic local SEO",
      "Mobile responsive",
      "Google Maps integration",
      "30-min training session",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "Starting at $4,499",
    desc: "For established businesses ready to generate more leads",
    features: [
      "Everything in Starter",
      "Up to 10 pages",
      "Advanced forms & lead routing",
      "Review integration",
      "Service pages (up to 5)",
      "Copywriting polish",
      "Conversion optimization",
      "Performance optimization",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "Starting at $7,999",
    desc: "For businesses serious about dominating their local market",
    features: [
      "Everything in Growth",
      "Up to 15 pages",
      "2 landing pages",
      "Advanced tracking",
      "Content strategy + 3 posts",
      "Local SEO Pro",
      "Performance audit",
      "Priority support",
    ],
    featured: false,
  },
] as const

const CARE_PACKAGES = [
  {
    name: "Essentials",
    price: "$99",
    suffix: "/month",
    desc: "Peace of mind for small businesses",
    features: [
      "WordPress updates",
      "Daily backups (30-day retention)",
      "Uptime monitoring",
      "Basic security",
      "30 min/month edits",
      "SSL certificate",
      "Hosting included",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$199",
    suffix: "/month",
    desc: "For growing businesses",
    features: [
      "Everything in Essentials",
      "Priority support (24hr)",
      "Security hardening",
      "Performance monitoring",
      "60 min/month edits",
      "Monthly optimization",
      "Detailed reports",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "$399",
    suffix: "/month",
    desc: "For serious growth",
    features: [
      "Everything in Growth",
      "2 hours/month edits",
      "Content iterations",
      "1 landing page/quarter",
      "Quarterly tune-ups",
      "Strategy calls",
      "Premium hosting",
    ],
    featured: false,
  },
] as const

type PackageItem =
  | (typeof BUILD_PACKAGES)[number]
  | (typeof CARE_PACKAGES)[number]

function PackageCardContent({
  pkg,
  className,
}: {
  pkg: PackageItem
  className?: string
}) {
  return (
    <Card
      className={`h-full overflow-hidden rounded-lg ${pkg.featured ? "ring-2 ring-[var(--primary-color)]/40 ring-inset" : ""} ${className ?? ""}`}
    >
      {pkg.featured && (
        <div className="bg-[var(--primary-color)] py-1 text-center text-xs font-semibold text-white">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
        <p className="text-lg font-semibold text-[var(--primary-color)] sm:text-xl">
          {pkg.price}
          {"suffix" in pkg && pkg.suffix ? (
            <span className="text-sm font-normal">{pkg.suffix}</span>
          ) : null}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[var(--text-light)]">{pkg.desc}</p>
        <ul className="space-y-1 text-sm text-[var(--text-light)]">
          {pkg.features.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const FLIP_DURATION = 0.45

function FlipCarousel({
  packages,
  id,
}: {
  packages: readonly PackageItem[]
  id: string
}) {
  const count = packages.length
  const [displayOrder, setDisplayOrder] = useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => i)
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const flipPendingRef = useRef<{
    state: ReturnType<typeof Flip.getState>
    targets: HTMLElement[]
  } | null>(null)

  useLayoutEffect(() => {
    setDisplayOrder(Array.from({ length: count }, (_, i) => i))
    flipPendingRef.current = null
  }, [id, count])

  useLayoutEffect(() => {
    const pending = flipPendingRef.current
    if (!pending || !containerRef.current) return
    flipPendingRef.current = null
    const { state, targets } = pending
    if (targets.length === 0) {
      setIsAnimating(false)
      return
    }
    // Let the browser finish layout after React's reorder so Flip reads correct end positions
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Flip.from(state, {
          targets,
          duration: FLIP_DURATION,
          ease: "power2.inOut",
          absolute: true,
          onComplete: () => setIsAnimating(false),
        })
      })
    })
    return () => cancelAnimationFrame(rafId)
  }, [displayOrder])

  const goNext = () => {
    if (count <= 1 || isAnimating) return
    const container = containerRef.current
    if (!container) return
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".flip-card"))
    if (cards.length === 0) return
    setIsAnimating(true)
    flipPendingRef.current = { state: Flip.getState(cards), targets: cards }
    setDisplayOrder((prev) => [...prev.slice(1), prev[0]])
  }

  const goPrev = () => {
    if (count <= 1 || isAnimating) return
    const container = containerRef.current
    if (!container) return
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".flip-card"))
    if (cards.length === 0) return
    setIsAnimating(true)
    flipPendingRef.current = { state: Flip.getState(cards), targets: cards }
    setDisplayOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)])
  }

  if (count === 0) return null

  const currentIndex = displayOrder[0] ?? 0

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg min-h-[320px] sm:min-h-[360px]">
        <div
          ref={containerRef}
          className="flex min-h-full"
          style={{ width: `${count * 100}%`, minHeight: "320px" }}
        >
          {displayOrder.map((pkgIndex) => (
            <div
              key={pkgIndex}
              className="flip-card flex shrink-0"
              style={{
                flexBasis: `${100 / count}%`,
                width: `${100 / count}%`,
                minWidth: 0,
              }}
            >
              <PackageCardContent pkg={packages[pkgIndex]} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous package"
          disabled={isAnimating}
          className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--border-color)] text-[var(--text-dark)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="min-w-[4rem] text-center text-sm font-medium text-[var(--text-light)]">
          {currentIndex + 1} / {count}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next package"
          disabled={isAnimating}
          className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--border-color)] text-[var(--text-dark)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {packages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to package ${i + 1}`}
            disabled={isAnimating}
            onClick={() => {
              if (i === currentIndex) return
              const stepsForward = (i - currentIndex + count) % count
              const stepsBackward = (currentIndex - i + count) % count
              const forward = stepsForward <= stepsBackward
              const n = forward ? stepsForward : stepsBackward
              if (n <= 0) return
              let remaining = n
              const run = () => {
                if (remaining <= 0) return
                if (forward) goNext()
                else goPrev()
                remaining--
                if (remaining > 0) setTimeout(run, (FLIP_DURATION + 0.05) * 1000)
              }
              run()
            }}
            className={`h-2 w-2 rounded-full transition sm:h-2.5 sm:w-2.5 ${
              i === currentIndex
                ? "scale-125 bg-[var(--primary-color)]"
                : "bg-[var(--border-color)] hover:bg-[var(--primary-color)]/60"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function PackagesSection() {
  const [tab, setTab] = useState<"build" | "care">("build")

  return (
    <section
      id="packages"
      className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-light)] py-16 sm:py-20"
    >
      <Container className="px-4 sm:px-5">
        <h2
          className="text-center text-2xl font-bold text-[var(--text-dark)] sm:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[var(--text-light)] sm:text-base">
          Choose the package that fits your needs
        </p>

        <div className="mt-6 flex justify-center gap-2 sm:mt-8">
          <button
            type="button"
            onClick={() => setTab("build")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === "build"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-white text-[var(--text-dark)] hover:bg-white/80"
            }`}
          >
            Website Build
          </button>
          <button
            type="button"
            onClick={() => setTab("care")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              tab === "care"
                ? "bg-[var(--primary-color)] text-white"
                : "bg-white text-[var(--text-dark)] hover:bg-white/80"
            }`}
          >
            Care Plans
          </button>
        </div>

        <div className="mt-8 sm:mt-10">
          {tab === "build" && (
            <FlipCarousel packages={[...BUILD_PACKAGES]} id="build" />
          )}
          {tab === "care" && (
            <FlipCarousel packages={[...CARE_PACKAGES]} id="care" />
          )}
        </div>
      </Container>
    </section>
  )
}
