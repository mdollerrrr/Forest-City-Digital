"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Container } from "./Container"

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Work", href: "/#work" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[1000] border-b border-[var(--border-color)] bg-white/85 shadow-sm backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--primary-color)] no-underline"
        >
          Forest City Digital
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--text-dark)] font-medium no-underline transition-colors hover:text-[var(--primary-color)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/contact" variant="default" size="default">
            Get Started
          </Button>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1 rounded p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={cn(
              "block h-0.5 w-6 bg-[var(--text-dark)] transition",
              mobileOpen && "translate-y-1.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-[var(--text-dark)] transition",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-[var(--text-dark)] transition",
              mobileOpen && "-translate-y-1.5 -rotate-45"
            )}
          />
        </button>
      </Container>
      {mobileOpen && (
        <div className="border-t border-[var(--border-color)] bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-[var(--text-dark)] font-medium no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="default" size="default" className="mt-2">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
