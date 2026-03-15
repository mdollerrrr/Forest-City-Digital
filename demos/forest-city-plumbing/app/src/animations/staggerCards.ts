import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type StaggerCardsOptions = {
  trigger: HTMLElement | null
  y?: number
  duration?: number
  stagger?: number
  ease?: string
  start?: string
}

/**
 * Animate a set of elements (e.g. service cards) appearing sequentially on scroll.
 * Uses ScrollTrigger. Clean up with killStaggerScrollTriggers() or kill the returned tween.
 */
export function staggerCards(
  elements: gsap.TweenTarget,
  options: StaggerCardsOptions
) {
  const {
    trigger,
    y = 28,
    duration = 0.45,
    stagger = 0.08,
    ease = "power2.out",
    start = "top 82%",
  } = options

  if (!trigger) return null

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  )
}

export function killStaggerScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
