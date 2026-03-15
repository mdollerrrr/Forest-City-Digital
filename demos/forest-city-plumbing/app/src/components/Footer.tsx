import * as React from "react"
import { PhoneCall } from "lucide-react"
import { business } from "@/config/business"
import { Separator } from "@/components/ui/separator"
import { Container } from "./Container"

export function Footer() {
  const tel = React.useMemo(
    () => business.phone.replace(/[^\d+]/g, ""),
    []
  )
  const serviceLinks = business.services.slice(0, 4).map((name) => ({
    label: name,
    href: "#services",
  }))

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <p className="text-lg font-semibold tracking-tight text-foreground">
              {business.name}
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Professional service with fast response, upfront pricing, and workmanship you can trust.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                className="inline-flex items-center gap-2 font-medium text-foreground hover:underline"
                href={`tel:${tel}`}
              >
                <PhoneCall className="size-4" />
                {business.phone}
              </a>
              <a className="font-medium text-foreground hover:underline" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <p className="text-muted-foreground">Service hours: 8am–6pm • Mon–Sat</p>
            </div>
          </div>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "#about" },
              { label: "Service Area", href: "#service-area" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ]}
          />
        </div>

        <Separator className="my-10" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>Licensed • Insured • Trusted locally</p>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="grid gap-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <a className="hover:text-foreground hover:underline" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
