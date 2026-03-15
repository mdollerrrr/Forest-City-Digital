"use client"

import Link from "next/link"
import * as React from "react"
import { gsap } from "gsap"

import { Container } from "./Container"
import { UnicornBackground } from "./UnicornBackground"

const HEADLINE = "We build websites you don't have to worry about"
const SUBTITLE =
  "Websites for Local Businesses That Actually Bring You Customers"
const TRUST_STRIP = [
  "Fast turnaround",
  "Mobile-first",
  "Maintenance included",
  "Local to London, ON",
]

export function Hero() {
  const headlineRef = React.useRef<HTMLHeadingElement>(null)

  React.useLayoutEffect(() => {
    const headline = headlineRef.current
    if (!headline || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const originalText = HEADLINE
    headline.setAttribute("aria-label", originalText)
    headline.innerHTML = ""

    const fragment = document.createDocumentFragment()
    const charElements: HTMLSpanElement[] = []

    for (const word of originalText.split(" ")) {
      const wordSpan = document.createElement("span")
      wordSpan.className = "inline-block"
      wordSpan.setAttribute("aria-hidden", "true")
      for (const char of word) {
        const charSpan = document.createElement("span")
        charSpan.className = "char inline-block will-change-transform"
        charSpan.textContent = char
        wordSpan.appendChild(charSpan)
        charElements.push(charSpan)
      }
      fragment.appendChild(wordSpan)
      fragment.appendChild(document.createTextNode(" "))
    }

    headline.appendChild(fragment)
    gsap.set(headline, { opacity: 1 })

    const tween = gsap.from(charElements, {
      duration: 1,
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
      ease: "back.out(1.7)",
      stagger: 0.05,
      onComplete: () => {
        headline.textContent = originalText
        headline.removeAttribute("aria-label")
      },
    })

    return () => {
      tween.kill()
      headline.textContent = originalText
      headline.removeAttribute("aria-label")
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white"
    >
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px circle at 50% 25%, rgba(255,255,255,0.14), transparent 58%), radial-gradient(900px circle at 12% 85%, rgba(245,158,11,0.1), transparent 62%), radial-gradient(900px circle at 90% 80%, rgba(255,255,255,0.06), transparent 62%)",
        }}
      />
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <UnicornBackground />
      </div>
      <div
        className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-white/[0.08] to-white/20"
        aria-hidden="true"
      />
      <Container className="relative z-30 py-20 text-center">
        <div className="mx-auto max-w-[760px]">
          <h1
            ref={headlineRef}
            className="headline mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {HEADLINE}
          </h1>
          <p className="mb-10 max-w-[700px] mx-auto text-lg opacity-90 md:text-xl">
            {SUBTITLE}
          </p>
          <div className="mb-5 inline-block rounded-2xl border border-white/15 bg-white/10 px-8 py-6 shadow-lg backdrop-blur">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-lg font-semibold text-[var(--primary-color)] transition hover:bg-white/90">
                Get Your Free Quote
              </Link>
              <Link href="/portfolio" className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white/90 px-8 text-lg font-semibold text-white transition hover:bg-white hover:text-[var(--primary-color)]">
                View Our Work
              </Link>
            </div>
          </div>
          <p className="mb-8 text-base opacity-80">
            Starting at $999 • Packages from $99/month
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm opacity-90">
            {TRUST_STRIP.map((item, i) => (
              <span key={item}>
                {item}
                {i < TRUST_STRIP.length - 1 && (
                  <span className="ml-6 opacity-70">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
