import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type ScrollRevealOptions = {
  /** Element that triggers the animation when it enters view (default: same as element) */
  trigger?: HTMLElement | null
  /** Vertical offset in px for from state (default: 20) */
  y?: number
  /** Animation duration in seconds (default: 0.5) */
  duration?: number
  /** Easing (default: power2.out) */
  ease?: string
  /** ScrollTrigger start position (default: "top 88%") */
  start?: string
}

/**
 * Animate an element fading in and moving up when scrolled into view.
 * Use for page sections. Pass the section content element (or section itself).
 * Returns a cleanup function that kills the ScrollTrigger.
 */
export function scrollReveal(
  element: HTMLElement | null,
  options: ScrollRevealOptions = {}
): (() => void) | null {
  if (!element) return null

  const {
    trigger = element,
    y = 20,
    duration = 0.5,
    ease = "power2.out",
    start = "top 88%",
  } = options

  const tween = gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: trigger ?? element,
        start,
        toggleActions: "play none none none",
      },
    }
  )

  return () => {
    tween.kill()
  }
}

export function killScrollRevealTriggers(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
