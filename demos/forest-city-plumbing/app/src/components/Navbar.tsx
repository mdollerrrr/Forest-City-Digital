import * as React from "react"
import { Menu, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { business } from "@/config/business"
import { cn } from "@/lib/utils"
import { LinkButton } from "./LinkButton"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const

export function Navbar() {
  const tel = React.useMemo(
    () => business.phone.replace(/[^\d+]/g, ""),
    []
  )
  const shortName = business.name.split(" ").slice(0, 2).join(" ") || business.name

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            {business.name.charAt(0)}
          </span>
          <span className="hidden sm:inline">{business.name}</span>
          <span className="sm:hidden">{shortName}</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <LinkButton href={`tel:${tel}`} variant="outline" className="gap-2">
            <PhoneCall className="size-4" />
            {business.ctaSecondary}
          </LinkButton>
          <LinkButton href="#contact">{business.ctaPrimary}</LinkButton>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <LinkButton
            href={`tel:${tel}`}
            size="icon"
            variant="outline"
            aria-label="Call now"
          >
            <PhoneCall className="size-4" />
          </LinkButton>
          <Sheet>
            <SheetTrigger
              render={
                <Button size="icon" variant="outline" aria-label="Open menu" />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className={cn("w-[320px] sm:w-[380px]")}>
              <div className="mt-8 grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                <LinkButton href="#contact">{business.ctaPrimary}</LinkButton>
                <LinkButton href={`tel:${tel}`} variant="outline" className="gap-2">
                  <PhoneCall className="size-4" />
                  {business.ctaSecondary}
                </LinkButton>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Available for emergencies.
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
