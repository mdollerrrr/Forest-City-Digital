import { useEffect } from "react"
import { initLenis, destroyLenis } from "@/lib/lenis"
import { connectLenisToScrollTrigger, disconnectLenisFromScrollTrigger } from "@/lib/gsap"

/**
 * Initialize Lenis smooth scroll and sync with GSAP ScrollTrigger.
 * Use once at app root (e.g. in App.tsx).
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    initLenis({ duration: 1.2, smoothWheel: true, autoRaf: false })
    connectLenisToScrollTrigger()
    return () => {
      disconnectLenisFromScrollTrigger()
      destroyLenis()
    }
  }, [])
}
