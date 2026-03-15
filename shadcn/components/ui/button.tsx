import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = {
  variant: {
    default:
      "bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:shadow-lg",
    secondary:
      "bg-transparent text-[var(--primary-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white",
    outline:
      "border border-[var(--border-color)] bg-transparent hover:bg-[var(--bg-light)]",
  },
  size: {
    default: "h-10 px-6 py-2 text-base",
    lg: "h-12 px-8 py-3 text-lg",
    sm: "h-8 px-4 text-sm",
  },
}

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  as?: "a" | "button"
}

const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      as: Comp = "a",
      ...props
    },
    ref
  ) => {
    const combined = cn(
      "inline-flex items-center justify-center rounded-md font-semibold transition-all focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] focus-visible:ring-offset-2",
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      className
    )
    if (Comp === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={combined}
          type="button"
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        />
      )
    }
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
