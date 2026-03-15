"use client"

import { cn } from "@/lib/utils"

export interface FloatingBackgroundProps {
  className?: string
  /** Number of blob/orb elements */
  count?: number
  /** Whether to animate (CSS float) */
  animated?: boolean
}

/**
 * Decorative floating blobs for hero or section backgrounds. GPU-friendly (transform + opacity).
 */
export function FloatingBackground({
  className,
  count = 4,
  animated = true,
}: FloatingBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/15 opacity-60",
            i === 0 && "top-[10%] left-[5%] h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]",
            i === 1 && "top-[50%] right-[0%] h-[200px] w-[200px] sm:h-[260px] sm:w-[260px]",
            i === 2 && "bottom-[5%] left-[20%] h-[160px] w-[160px] sm:h-[220px] sm:w-[220px]",
            i === 3 && "top-[20%] right-[25%] h-[120px] w-[120px] sm:h-[180px] sm:w-[180px]",
            i >= 4 && "top-[70%] right-[15%] h-[100px] w-[100px]"
          )}
          style={
            animated
              ? {
                  animation: `float ${14 + i * 2}s ease-in-out ${i * 0.8}s infinite`,
                }
              : undefined
          }
        />
      ))}
    </div>
  )
}
