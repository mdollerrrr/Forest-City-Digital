import Link from "next/link"

import { Container } from "./Container"

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--text-dark)] py-12 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h4 className="text-lg font-semibold">Forest City Digital</h4>
            <p className="mt-2 text-sm opacity-90">
              Websites You Don&apos;t Have to Worry About
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/#home" className="opacity-90 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#work" className="opacity-90 hover:opacity-100">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/#packages" className="opacity-90 hover:opacity-100">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 hover:opacity-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="opacity-90 hover:opacity-100">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <p className="mt-2 text-sm opacity-90">
              <a
                href="mailto:ForestCityDigital@gmail.com"
                className="hover:underline"
              >
                ForestCityDigital@gmail.com
              </a>
            </p>
            <p className="text-sm opacity-90">(226-559-7450)</p>
            <p className="mt-2 text-sm">
              <a
                href="https://www.instagram.com/forestcitydigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 opacity-90 hover:opacity-100"
              >
                <span aria-hidden>📷</span>
                Instagram
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} Forest City Digital. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
