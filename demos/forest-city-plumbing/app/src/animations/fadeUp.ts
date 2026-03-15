import { gsap } from "gsap"

export type FadeUpOptions = {
  y?: number
  duration?: number
  ease?: string
  delay?: number
}

/**
 * Animate elements fading upward.
 */
export function fadeUp(
  elements: gsap.TweenTarget,
  options: FadeUpOptions = {}
) {
  const { y = 24, duration = 0.5, ease = "power2.out", delay = 0 } = options
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, delay }
  )
}
