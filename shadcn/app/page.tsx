import { Header } from "@/components/site/Header"
import { MobileCtaBar } from "@/components/site/MobileCtaBar"
import { Hero } from "@/components/site/Hero"
import { WhoForSection } from "@/components/site/WhoForSection"
import { WorkSection } from "@/components/site/WorkSection"
import { PackagesSection } from "@/components/site/PackagesSection"
import { WhySection } from "@/components/site/WhySection"
import { FAQSection } from "@/components/site/FAQSection"
import { Footer } from "@/components/site/Footer"
import { ScrollReveal } from "@/components/site/ScrollReveal"

export default function Home() {
  return (
    <>
      <Header />
      <MobileCtaBar />
      <main>
        <Hero />
        <ScrollReveal>
          <WhoForSection />
          <WorkSection />
          <PackagesSection />
          <WhySection />
          <FAQSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}
