import { gsap } from "gsap"

export type CtaPulseOptions = {
  /** Scale at peak (default: 1.03) */
  scale?: number
  /** Cycle duration in seconds (default: 2) */
  duration?: number
  /** Easing (default: power1.inOut) */
  ease?: string
}

/**
 * Gentle infinite pulse for CTA buttons. Subtle scale animation.
 * Returns a cleanup function that kills the animation.
 */
export function ctaPulse(
  element: HTMLElement | null,
  options: CtaPulseOptions = {}
): (() => void) | null {
  if (!element) return null

  const { scale = 1.03, duration = 2, ease = "power1.inOut" } = options

  const tween = gsap.to(element, {
    scale,
    duration,
    ease,
    repeat: -1,
    yoyo: true,
    overwrite: "auto",
  })

  return () => {
    tween.kill()
    gsap.set(element, { clearProps: "scale" })
  }
}
