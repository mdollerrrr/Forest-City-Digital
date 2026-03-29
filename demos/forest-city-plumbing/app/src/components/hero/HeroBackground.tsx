"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { gsap } from "@/lib/gsap"

export interface HeroBackgroundProps {
  className?: string
  /** Number of floating glow blobs (2–3 recommended) */
  blobCount?: 2 | 3
  /** Enable subtle scroll-based parallax on glows */
  parallax?: boolean
  /** Reduce motion: disable animations */
  reducedMotion?: boolean
}

/* color-mix works with theme hex vars (--primary, --accent) in light/dark */
const BLOB_CONFIG = [
  {
    size: "min(80vw, 520px)",
    position: { top: "8%", left: "5%" },
    gradient:
      "radial-gradient(circle, color-mix(in srgb, var(--primary) 14%, transparent) 0%, color-mix(in srgb, var(--primary) 5%, transparent) 45%, transparent 70%)",
    duration: 28,
    delay: 0,
    keyframes: { x: [0, 22, -10, 0], y: [0, -16, 10, 0] },
  },
  {
    size: "min(70vw, 420px)",
    position: { top: "55%", right: "0%", left: "auto" },
    gradient:
      "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, color-mix(in srgb, var(--accent) 4%, transparent) 50%, transparent 70%)",
    duration: 36,
    delay: 2,
    keyframes: { x: [0, -18, 14, 0], y: [0, 12, -6, 0] },
  },
  {
    size: "min(60vw, 380px)",
    position: { bottom: "10%", left: "15%" },
    gradient:
      "radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, color-mix(in srgb, var(--primary) 3%, transparent) 50%, transparent 70%)",
    duration: 32,
    delay: 1,
    keyframes: { x: [0, 16, -8, 0], y: [0, -10, 14, 0] },
  },
] as const

/** Faint noise texture as data URL to reduce gradient smoothness */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

/**
 * Premium hero background: slow floating glow gradients + subtle grain.
 * Layering: base → gradient blobs (Motion) → grain overlay.
 * Optional GSAP ScrollTrigger parallax. GPU-friendly (transform + opacity only).
 */
export function HeroBackground({
  className,
  blobCount = 3,
  parallax = true,
  reducedMotion: reducedMotionProp,
}: HeroBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const blobRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    if (reducedMotionProp !== undefined) {
      setReducedMotion(reducedMotionProp)
      return
    }
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [reducedMotionProp])

  React.useEffect(() => {
    if (!parallax || reducedMotion) return
    const ctx = gsap.context(() => {
      blobRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return
        gsap.fromTo(
          wrapper,
          { y: 0 },
          {
            y: () => (i === 0 ? -12 : i === 1 ? 8 : -8),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [parallax, reducedMotion])

  const blobs = BLOB_CONFIG.slice(0, blobCount)

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* Layer 1: Gradient glow blobs — transform-only animation */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el
          }}
          className="absolute h-0 w-0 will-change-transform"
          style={{
            left: blob.position.left ?? "auto",
            right: blob.position.right ?? "auto",
            top: blob.position.top ?? "auto",
            bottom: blob.position.bottom ?? "auto",
          }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width: blob.size,
              height: blob.size,
              marginLeft: "-50%",
              marginTop: "-50%",
              background: blob.gradient,
              filter: "blur(60px)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    x: blob.keyframes.x,
                    y: blob.keyframes.y,
                  }
            }
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: blob.delay,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}

      {/* Layer 2: Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  )
}
