import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Container } from "@/components/site/Container"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="min-h-[50vh] py-20">
        <Container className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-dark)]">
            Portfolio
          </h1>
          <p className="mt-4 text-[var(--text-light)]">
            View our work and demos on the homepage.
          </p>
          <p className="mt-6">
            <Button href="/#work">View Our Work</Button>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  )
}
