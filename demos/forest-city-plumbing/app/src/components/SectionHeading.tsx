import * as React from "react"
import { cn } from "@/lib/utils"

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {kicker ? (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 shrink-0 bg-primary/60" aria-hidden />
          <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground">
            {kicker}
          </p>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
