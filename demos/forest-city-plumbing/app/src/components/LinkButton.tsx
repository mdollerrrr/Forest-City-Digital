import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>
>(function LinkButton({ className, variant, size, ...props }, ref) {
  return (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})
