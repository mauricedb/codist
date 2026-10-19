import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { AppMockup } from "./mockups"
import { FiveStars } from "./rating"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Clarity, finally.
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Join 50+ million professionals who simplify work and life with the
          world&apos;s #1 to-do list app.
        </p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          374K+ <FiveStars /> reviews
        </p>
        <Link
          href="/signup"
          className={buttonVariants({ size: "lg", className: "px-5" })}
        >
          Start for free
        </Link>
      </div>
      <AppMockup />
    </section>
  )
}
