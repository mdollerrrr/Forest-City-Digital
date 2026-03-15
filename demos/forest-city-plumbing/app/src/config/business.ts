/**
 * Business configuration for the local service website template.
 * Edit this file to rebrand for HVAC, plumbing, electricians, roofers, contractors.
 */

export const business = {
  name: "Example HVAC",
  phone: "(555) 555-5555",
  city: "London, Ontario",
  email: "hello@examplehvac.ca",

  tagline: "Reliable HVAC Done Right the First Time.",
  subheadline:
    "Professional heating, cooling, and ventilation. Fast response, upfront pricing, and trusted local technicians.",

  ctaPrimary: "Get a Free Quote",
  ctaSecondary: "Call Now",

  trustBar: [
    "Licensed & Insured",
    "Same-Day Service",
    "Upfront Pricing",
    "Satisfaction Guarantee",
  ],

  services: [
    "Furnace Repair",
    "AC Installation",
    "Emergency HVAC Repair",
    "Water Heater Repair",
    "Boiler Services",
    "Maintenance Plans",
  ],

  serviceAreas: [
    "London",
    "St. Thomas",
    "Woodstock",
    "Strathroy",
    "Ingersoll",
    "Tillsonburg",
  ],

  whyChooseUs: [
    {
      title: "Licensed & Insured",
      description: "Code-compliant work from experienced, vetted technicians.",
    },
    {
      title: "Same-Day Service",
      description: "Fast booking and priority for urgent calls.",
    },
    {
      title: "Upfront Pricing",
      description: "Transparent quotes—no surprises when the job is done.",
    },
    {
      title: "Satisfaction Guarantee",
      description: "We stand behind our work. Your peace of mind matters.",
    },
  ],

  processSteps: [
    { step: 1, title: "Call", description: "Call or request a quote. We'll get you on the schedule." },
    { step: 2, title: "Diagnose", description: "We inspect, explain the issue, and give a clear price." },
    { step: 3, title: "Fix", description: "We fix it, test it, and clean up—you're back to normal." },
  ],

  faqs: [
    {
      question: "Do you offer emergency service?",
      answer:
        "Yes. We prioritize urgent calls—no heat, no cooling, and safety issues. Call us and we'll get you on the schedule as soon as possible, often same day.",
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
        "We serve the greater area including surrounding communities. Contact us to confirm service in your area.",
    },
  ],
} as const

export type Business = typeof business
