import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type ScrollFadeOptions = {
  trigger: HTMLElement | null
  y?: number
  duration?: number
  ease?: string
  start?: string
}

/**
 * Animate sections when they scroll into view using ScrollTrigger.
 */
export function scrollFade(
  elements: gsap.TweenTarget,
  options: ScrollFadeOptions
) {
  const {
    trigger,
    y = 24,
    duration = 0.5,
    ease = "power2.out",
    start = "top 85%",
  } = options

  if (!trigger) return null

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  )
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
