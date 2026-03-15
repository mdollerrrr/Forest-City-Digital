/**
 * Reusable home service site config.
 * Change these values to rebrand for plumbing, HVAC, electrician, etc.
 */

export const siteConfig = {
  companyName: "Forest City Plumbing",
  tagline: "Reliable Plumbing Done Right the First Time.",
  subheadline:
    "Professional residential and commercial plumbing. Fast response, upfront pricing, and trusted local technicians.",
  phone: "(226) 555-0123",
  email: "hello@forestcityplumbing.ca",

  /** For meta and accessibility */
  businessType: "plumbing" as const, // "plumbing" | "hvac" | "electrician" | "roofer" | "contractor"

  /** Hero CTAs */
  ctaPrimary: "Get a Free Quote",
  ctaSecondary: "Call Now",

  /** Trust bar (below hero) */
  trustBar: [
    { label: "Licensed & Insured", short: "Licensed & Insured" },
    { label: "Same-Day Service", short: "Same-Day" },
    { label: "Upfront Pricing", short: "Upfront Pricing" },
    { label: "Satisfaction Guarantee", short: "Satisfaction Guarantee" },
  ],

  /** Services grid: icon (lucide name), title, description. Swap for HVAC, electrician, etc. */
  services: [
    {
      icon: "PhoneCall",
      title: "Emergency Plumbing",
      description: "Rapid response for leaks, backups, and urgent failures—day or night.",
    },
    {
      icon: "Droplets",
      title: "Drain Cleaning",
      description: "Clear clogs and restore flow with safe, effective drain solutions.",
    },
    {
      icon: "Thermometer",
      title: "Water Heater Installation",
      description: "Install, repair, and upgrade water heaters for consistent hot water.",
    },
    {
      icon: "Wrench",
      title: "Leak Detection",
      description: "Find hidden leaks early to prevent damage and reduce water bills.",
    },
    {
      icon: "Flame",
      title: "Boiler & Radiant",
      description: "Boiler repair, maintenance, and radiant heating service.",
    },
    {
      icon: "ClipboardCheck",
      title: "Maintenance Plans",
      description: "Scheduled inspections and maintenance to prevent costly repairs.",
    },
  ],

  /** Why choose us (4 cards) */
  whyChooseUs: [
    {
      icon: "ShieldCheck",
      title: "Licensed & Insured",
      description: "Code-compliant work from experienced, vetted technicians.",
    },
    {
      icon: "Clock",
      title: "Same-Day Service",
      description: "Fast booking and priority for urgent calls.",
    },
    {
      icon: "BadgeDollarSign",
      title: "Upfront Pricing",
      description: "Transparent quotes—no surprises when the job is done.",
    },
    {
      icon: "Star",
      title: "Satisfaction Guarantee",
      description: "We stand behind our work. Your peace of mind matters.",
    },
  ],

  /** Process steps */
  processSteps: [
    { step: 1, icon: "Phone", title: "Call", description: "Call or request a quote. We'll get you on the schedule." },
    { step: 2, icon: "Search", title: "Diagnose", description: "We inspect, explain the issue, and give a clear price." },
    { step: 3, icon: "Wrench", title: "Fix", description: "We fix it, test it, and clean up—you're back to normal." },
  ],

  /** Service area cities */
  serviceAreas: [
    "London",
    "St. Thomas",
    "Woodstock",
    "Ingersoll",
    "Tillsonburg",
    "Strathroy",
    "Sarnia",
    "Windsor",
  ],

  /** FAQ items */
  faqs: [
    {
      question: "Do you offer emergency service?",
      answer:
        "Yes. We prioritize urgent calls—no heat, no cooling, leaks, and safety issues. Call us and we'll get you on the schedule as soon as possible, often same day.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes. Our technicians are licensed and we carry full liability and workers' compensation insurance for your protection.",
    },
    {
      question: "Do you give quotes before starting work?",
      answer:
        "Yes. We provide upfront pricing before we start. You'll know the cost for standard repairs and we'll quote any larger work after an inspection.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve London and the surrounding region, including St. Thomas, Woodstock, and nearby communities. Contact us to confirm service in your area.",
    },
  ],

  /** Optional theme overrides (CSS custom property names) */
  theme: {
    // primary: "#0f3b5c",
    // accent: "#0ea5e9",
  },
} as const

export type SiteConfig = typeof siteConfig
