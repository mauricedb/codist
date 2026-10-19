import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { TodayPreview } from "./mockups"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-4 py-20 md:px-8 lg:grid-cols-2 lg:py-28">
      <div className="flex flex-col items-start gap-7">
        <p className="font-mono text-[0.8125rem] text-muted-foreground">
          / today · inbox · done
        </p>
        <h1 className="text-5xl leading-[0.98] font-semibold tracking-[-0.045em] md:text-7xl lg:text-[5.25rem]">
          Less on your mind.
          <br />
          More on <span className="text-brand">your list.</span>
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          A plain, fast task manager. Write tasks the way you say them, see
          only what&apos;s due, and tick them off without ceremony.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/app/today"
            className={buttonVariants({
              size: "lg",
              className: "h-12 px-6 text-base font-semibold",
            })}
          >
            Start a list
          </Link>
          <Link
            href="#features"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-12 border-input bg-transparent px-6 text-base",
            })}
          >
            Tour the features
          </Link>
        </div>
      </div>
      <TodayPreview />
    </section>
  )
}
