import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getLenis } from "./lenis"

gsap.registerPlugin(ScrollTrigger)

let tickerRemove: (() => void) | null = null

/**
 * Connect Lenis to GSAP ScrollTrigger. Call after initLenis({ autoRaf: false }).
 * Drives Lenis from GSAP ticker so scroll and ScrollTrigger stay in sync.
 */
export function connectLenisToScrollTrigger(): void {
  const lenis = getLenis()
  if (!lenis) return

  lenis.on("scroll", ScrollTrigger.update)
  tickerRemove = gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

/** Call before destroyLenis() so the ticker stops driving Lenis. */
export function disconnectLenisFromScrollTrigger(): void {
  tickerRemove?.()
  tickerRemove = null
}

export { gsap, ScrollTrigger }
