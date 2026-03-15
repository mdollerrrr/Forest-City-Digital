import type { LucideIcon } from "lucide-react"
import {
  BadgeDollarSign,
  ClipboardCheck,
  Clock,
  Droplets,
  Flame,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Snowflake,
  Star,
  Thermometer,
  Wrench,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  PhoneCall,
  Droplets,
  Thermometer,
  ClipboardCheck,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Star,
  Phone,
  Search,
  Wrench,
}

export function getIcon(name: string): LucideIcon {
  const icon = iconMap[name]
  if (!icon) return Wrench
  return icon
}
