"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      setVisible(window.innerWidth <= 768 && window.scrollY > 280)
    }
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[999] flex border-t border-[var(--border-color)] bg-white/95 shadow-lg backdrop-blur md:hidden"
      aria-hidden="true"
    >
      <Link
        href="tel:+12265597450"
        className="flex-1 py-3 text-center text-sm font-medium text-[var(--text-dark)]"
      >
        Call
      </Link>
      <Link
        href="mailto:ForestCityDigital@gmail.com"
        className="flex-1 py-3 text-center text-sm font-medium text-[var(--text-dark)]"
      >
        Email
      </Link>
      <Link
        href="/contact"
        className="flex-1 bg-[var(--primary-color)] py-3 text-center text-sm font-medium text-white"
      >
        Get Quote
      </Link>
    </div>
  )
}
