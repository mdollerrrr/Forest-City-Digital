import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"

const DEMOS_GROUP = {
  kicker: "Demos",
  title: "General demos",
  subtitle:
    "A quick look at what a modern, lead-focused site can include.",
  cards: [
    {
      title: "Restaurant Website",
      demoTitle: "Restaurant Demo",
      demoSub: "Bella Vista Restaurant",
      pill: "Warm • Hospitality",
      gradient: "linear-gradient(135deg, #6B4C5A 0%, #5A3D4A 100%)",
      description:
        "Features: Online menu, reservation system, hours & location, events page, mobile-optimized design",
      features: [
        "Click-to-call buttons",
        "Online ordering integration",
        "Google Maps integration",
        "Mobile-first design",
      ],
      href: "/demos/restaurant/index.html",
      image: "/assets/Restauraunt/spaghetti.png",
      imageAlt: "Restaurant demo",
    },
    {
      title: "Plumbing & HVAC Website",
      demoTitle: "Plumbing & HVAC Demo",
      demoSub: "Reliable Plumbing & HVAC",
      pill: "Trades • Utility",
      gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
      description:
        "Features: Service pages, emergency CTA, service area map, financing options, quote request form",
      features: [
        "24/7 emergency messaging",
        "Service area listings",
        "Quote request forms",
        "Trust signals & certifications",
      ],
      href: "/demos/plumber/index.html",
      image: "/assets/Main Website/technician.png",
      imageAlt: "Plumbing & HVAC demo",
    },
    {
      title: "Electrician & Roofing Website",
      demoTitle: "Electrician & Roofer Demo",
      demoSub: "Pro Electric & Roofing",
      pill: "Bold • High contrast",
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      description:
        "Features: Project gallery, reviews section, detailed service pages, certification badges, estimate request",
      features: [
        "Project gallery",
        "Customer reviews",
        "Free estimate forms",
        "License & insurance badges",
      ],
      href: "/demos/electrician/index.html",
      image: "/assets/Main Website/electrician.png",
      imageAlt: "Electrician & Roofer demo",
    },
  ],
} as const

const STYLES_GROUP = {
  kicker: "Styles",
  title: "Industry-Specific Styles",
  subtitle:
    "More tailored visuals and layout patterns — same lead-focused goal.",
  cards: [
    {
      title: "HVAC Website (High-end)",
      demoTitle: "HVAC Village",
      demoSub: "Clean & technical contractor style",
      pill: "Light industrial • Cool blue",
      gradient:
        "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 60%, #06b6d4 100%)",
      description:
        "Features: Modern service switcher, pricing panels, proof cards, scroll reveals, and a dedicated process page.",
      features: [
        "Premium contractor styling",
        "Pricing + financing patterns",
        "Motion + micro-interactions",
        "Mobile-first layout",
      ],
      href: "/demos/hvac-village/index.html",
      image: "/assets/Main Website/technician.png",
      imageAlt: "HVAC Village demo",
    },
    {
      title: "Electrician Website (Modern)",
      demoTitle: "NorthBolt Electric",
      demoSub: "Modern dark theme + sticky mobile CTA",
      pill: "Dark technical • Yellow accents",
      gradient:
        "linear-gradient(135deg, #070A12 0%, #0B1022 55%, #1d4ed8 110%)",
      description:
        "Features: Project gallery, pricing ranges, reviews with star ratings, process section, and mobile CTA bar.",
      features: [
        "Dark premium aesthetic",
        "Pricing + trust sections",
        "Gallery + proof blocks",
        "Sticky mobile CTA",
      ],
      href: "/demos/relume-northbolt-electric/home/index.html",
      image: "/assets/Main Website/electrician.png",
      imageAlt: "NorthBolt Electric demo",
    },
  ],
} as const

function WorkCard({
  title,
  demoTitle,
  demoSub,
  pill,
  gradient,
  description,
  features,
  href,
  image,
  imageAlt,
}: {
  title: string
  demoTitle: string
  demoSub: string
  pill: string
  gradient: string
  description: string
  features: readonly string[]
  href: string
  image: string
  imageAlt: string
}) {
  return (
    <Card data-reveal className="overflow-hidden p-0">
      <div
        className="relative flex min-h-[200px] flex-col justify-end p-5 text-white"
        style={{ background: gradient }}
      >
        <Badge className="absolute right-4 top-4 w-fit bg-white/20 text-white">
          {pill}
        </Badge>
        <img
          src={image}
          alt={imageAlt}
          className="mb-2 size-16 object-contain sm:size-20"
          loading="lazy"
        />
        <h3 className="mb-1 text-lg font-semibold">{demoTitle}</h3>
        <p className="text-sm opacity-90">{demoSub}</p>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-[var(--text-light)]">{description}</p>
        <ul className="space-y-1 text-sm text-[var(--text-light)]">
          {features.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
        <Button
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          size="default"
        >
          View Demo
        </Button>
      </CardContent>
    </Card>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="border-b border-[var(--border-color)] bg-white py-20">
      <Container>
        <h2
          className="text-center text-3xl font-bold text-[var(--text-dark)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          See What&apos;s Possible
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--text-light)]">
          These demo sites show the potential for your business — with multiple
          design styles.
        </p>

        <div className="mt-12 space-y-14">
          <div>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-light)]">
                  {DEMOS_GROUP.kicker}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-[var(--text-dark)]">
                  {DEMOS_GROUP.title}
                </h3>
                <p className="mt-1 text-[var(--text-light)]">
                  {DEMOS_GROUP.subtitle}
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS_GROUP.cards.map((c) => (
                <WorkCard key={c.title} {...c} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-light)]">
                  {STYLES_GROUP.kicker}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-[var(--text-dark)]">
                  {STYLES_GROUP.title}
                </h3>
                <p className="mt-1 text-[var(--text-light)]">
                  {STYLES_GROUP.subtitle}
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {STYLES_GROUP.cards.map((c) => (
                <WorkCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
