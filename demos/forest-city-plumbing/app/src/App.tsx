import { CTASection } from "@/components/CTASection"
import { EmergencyBanner } from "@/components/EmergencyBanner"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { Navbar } from "@/components/Navbar"
import { ProcessSteps } from "@/components/ProcessSteps"
import { ServiceArea } from "@/components/ServiceArea"
import { ServiceGrid } from "@/components/ServiceGrid"
import { TrustBar } from "@/components/TrustBar"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { GrainOverlay } from "@/components/animations/GrainOverlay"

function App() {
  useSmoothScroll()
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <GrainOverlay />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ServiceGrid />
      <WhyChooseUs />
      <ProcessSteps />
      <EmergencyBanner />
      <ServiceArea />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
