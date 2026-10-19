import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8 lg:pb-28">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[1.25rem] bg-primary px-8 py-16 text-primary-foreground md:px-14 md:py-18">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.035em] md:text-5xl">
            Clear your head in under a minute.
          </h2>
          <p className="text-primary-foreground/75">
            Open Codist and type the first thing on your mind.
          </p>
        </div>
        <Link
          href="/app/today"
          className={buttonVariants({
            size: "lg",
            className:
              "h-12 bg-brand px-7 text-base font-semibold text-brand-foreground hover:bg-brand/85",
          })}
        >
          Start a list
        </Link>
      </div>
    </section>
  )
}
