"use client"

import { cn } from "@/lib/utils"

/**
 * Single faint grain overlay for the whole page. Use once at app root.
 * Restrained, non-distracting.
 */
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay",
        "bg-[length:120px_120px] bg-[position:0_0]",
        className
      )}
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
