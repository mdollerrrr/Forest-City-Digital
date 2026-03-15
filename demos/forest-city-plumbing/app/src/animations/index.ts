/**
 * Reusable GSAP animation system for local business websites.
 * Use with React useRef + useEffect; respect prefers-reduced-motion in components.
 */

export { heroEntrance } from "./heroEntrance"
export type { HeroEntranceTargets } from "./heroEntrance"

export { staggerCards, killStaggerScrollTriggers } from "./staggerCards"
export type { StaggerCardsOptions } from "./staggerCards"

export { scrollReveal, killScrollRevealTriggers } from "./scrollReveal"
export type { ScrollRevealOptions } from "./scrollReveal"

export { hoverLift } from "./hoverLift"
export type { HoverLiftOptions } from "./hoverLift"

export { ctaPulse } from "./ctaPulse"
export type { CtaPulseOptions } from "./ctaPulse"
