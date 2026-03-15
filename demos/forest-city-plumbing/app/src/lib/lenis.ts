import Lenis from "lenis"

type LenisConstructorOptions = ConstructorParameters<typeof Lenis>[0]
export type LenisOptions = LenisConstructorOptions & {
  /** If false, do not start internal raf loop (use when driving via GSAP ticker). */
  autoRaf?: boolean
}

let lenisInstance: Lenis | null = null
let rafId: number | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Initialize Lenis smooth scroll. Call once at app root.
 * Use autoRaf: false when driving Lenis from GSAP ticker (e.g. useSmoothScroll).
 */
export function initLenis(options: LenisOptions = {}): Lenis {
  if (lenisInstance) return lenisInstance

  const { autoRaf = true, ...lenisOptions } = options
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
    ...lenisOptions,
  })

  if (autoRaf) {
    function raf(time: number) {
      lenisInstance?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  }

  return lenisInstance
}

/**
 * Stop Lenis and clean up. Call when unmounting the app or disabling smooth scroll.
 */
export function destroyLenis(): void {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lenisInstance?.destroy()
  lenisInstance = null
}
