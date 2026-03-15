import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-2", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-lg font-semibold text-[var(--text-dark)]", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-[var(--text-light)]", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
