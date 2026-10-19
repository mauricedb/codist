import { Features } from "@/components/landing/features"
import { FinalCta } from "@/components/landing/final-cta"
import { Hero } from "@/components/landing/hero"
import { Principles } from "@/components/landing/principles"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-muted">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Principles />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
