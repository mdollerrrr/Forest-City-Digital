import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Container } from "@/components/site/Container"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-[50vh] py-20">
        <Container className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-dark)]">
            Contact Us
          </h1>
          <p className="mt-4 text-[var(--text-light)]">
            Get your free quote. Email us at{" "}
            <a
              href="mailto:ForestCityDigital@gmail.com"
              className="text-[var(--primary-color)] underline"
            >
              ForestCityDigital@gmail.com
            </a>{" "}
            or call (226-559-7450).
          </p>
          <p className="mt-6">
            <Button href="/">Back to Home</Button>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  )
}
