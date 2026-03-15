import { gsap } from "gsap"

export type HoverLiftOptions = {
  /** Lift distance in px (default: -4) */
  y?: number
  /** Animation duration in seconds (default: 0.25) */
  duration?: number
}

/**
 * Subtle lift animation when hovering over cards.
 * Accepts a single element or a list (e.g. NodeList). Returns a single cleanup function.
 */
export function hoverLift(
  target: HTMLElement | NodeListOf<Element> | null,
  options: HoverLiftOptions = {}
): (() => void) | null {
  if (!target) return null

  const { y = -4, duration = 0.25 } = options
  const elements = "length" in target ? Array.from(target) : [target]
  const cleanups: Array<() => void> = []

  elements.forEach((el) => {
    if (!(el instanceof HTMLElement)) return
    const onEnter = () => gsap.to(el, { y, duration, ease: "power2.out" })
    const onLeave = () => gsap.to(el, { y: 0, duration, ease: "power2.out" })
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    cleanups.push(() => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      gsap.set(el, { clearProps: "y" })
    })
  })

  return () => cleanups.forEach((c) => c())
}
