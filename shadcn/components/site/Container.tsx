import * as React from "react"

import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto max-w-[1200px] px-5", className)}
      {...props}
    />
  )
}
