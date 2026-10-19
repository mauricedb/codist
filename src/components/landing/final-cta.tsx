import Link from "next/link"
import { DownloadIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { FiveStars } from "./rating"

export function FinalCta() {
  return (
    <section className="bg-muted/50 px-4 py-20 text-center md:px-8 lg:py-28">
      <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
        Gain calmness and clarity with the world&apos;s most beloved
        productivity app
      </h2>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
        374000+ <FiveStars /> reviews on Google Play and App Store
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link
          href="/signup"
          className={buttonVariants({ size: "lg", className: "px-5" })}
        >
          Start for free
        </Link>
        <Link
          href="/downloads"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <DownloadIcon aria-hidden />
          Download apps
        </Link>
      </div>
    </section>
  )
}
