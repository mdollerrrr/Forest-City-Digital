"use client"

import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

    const els = root.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!els.length) return

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return <div ref={rootRef}>{children}</div>
}
