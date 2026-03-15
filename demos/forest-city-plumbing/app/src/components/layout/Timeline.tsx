import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineStep {
  step: number
  title: string
  description: string
  icon?: React.ReactNode
}

export interface TimelineProps {
  steps: readonly TimelineStep[]
  heading?: React.ReactNode
  className?: string
  stepsRef?: React.RefObject<HTMLDivElement | null>
}

export function Timeline({
  steps,
  heading,
  className,
  stepsRef,
}: TimelineProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {heading != null && <div className="max-w-2xl">{heading}</div>}
      <div ref={stepsRef} className="relative">
        <div
          className="absolute left-[19px] top-8 bottom-8 w-px bg-border hidden sm:block"
          aria-hidden
        />
        <ul className="flex flex-col gap-0">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative flex gap-6 pb-10 last:pb-0"
              data-process-step
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-semibold text-primary shadow-sm">
                {item.step}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
