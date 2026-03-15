import { gsap } from "gsap"

export type HeroEntranceTargets = {
  headline?: HTMLElement | null
  subheadline?: HTMLElement | null
  cta?: HTMLElement | null
  cards?: NodeListOf<Element> | Element[] | null
}

/**
 * Staggered fade and upward motion for hero content.
 * Pass refs for headline, subheadline, cta wrapper, and optional right-side cards.
 * Returns the timeline for cleanup (tl.kill()).
 */
export function heroEntrance(targets: HeroEntranceTargets) {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

  if (targets.headline) {
    gsap.set(targets.headline, { opacity: 0, y: 24 })
    tl.to(targets.headline, { opacity: 1, y: 0, duration: 0.5 })
  }
  if (targets.subheadline) {
    gsap.set(targets.subheadline, { opacity: 0, y: 16 })
    tl.to(targets.subheadline, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
  }
  if (targets.cta) {
    gsap.set(targets.cta, { opacity: 0, y: 20 })
    tl.to(targets.cta, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
  }
  if (targets.cards?.length) {
    gsap.set(targets.cards, { opacity: 0, y: 20 })
    tl.to(
      targets.cards,
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
      "-=0.15"
    )
  }

  return tl
}
