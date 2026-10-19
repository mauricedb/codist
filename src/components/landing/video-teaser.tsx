import { PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function VideoTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <p className="mb-4 font-serif text-muted-foreground italic">
        Take a peek! Watch Codist in action.
      </p>
      <div className="relative flex aspect-video items-end overflow-hidden rounded-2xl bg-muted p-6 md:p-12">
        <h2 className="text-4xl font-bold tracking-tight md:text-7xl">
          What&apos;s
          <br />
          Codist?
        </h2>
        <Button
          size="lg"
          className="absolute top-1/2 left-1/2 -translate-1/2 px-4"
        >
          <PlayIcon aria-hidden />
          Play
        </Button>
      </div>
    </section>
  )
}
