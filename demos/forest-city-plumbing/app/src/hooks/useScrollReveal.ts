import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export type UseScrollRevealOptions = {
  y?: number
  duration?: number
  ease?: string
  start?: string
  once?: boolean
}

/**
 * Reveal an element when it scrolls into view. Uses GSAP ScrollTrigger.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 32,
    duration = 0.6,
    ease = "power3.out",
    start = "top 85%",
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: "play none none none",
        },
      }
    )
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [y, duration, ease, start, once])

  return ref
}
