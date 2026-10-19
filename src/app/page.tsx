import { AiSection } from "@/components/landing/ai-section"
import { Features } from "@/components/landing/features"
import { FinalCta } from "@/components/landing/final-cta"
import { Hero } from "@/components/landing/hero"
import { PressQuotes } from "@/components/landing/press-quotes"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { Templates } from "@/components/landing/templates"
import { TrustSection } from "@/components/landing/trust-section"
import { VideoTeaser } from "@/components/landing/video-teaser"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <PressQuotes />
        <Features />
        <VideoTeaser />
        <Templates />
        <AiSection />
        <TrustSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
