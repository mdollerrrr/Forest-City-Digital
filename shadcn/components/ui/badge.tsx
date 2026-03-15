import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-dark)]",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
