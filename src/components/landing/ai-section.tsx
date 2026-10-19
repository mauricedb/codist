import { PlayIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TextLink } from "./text-link"

const aiSteps = ["Gather metrics", "Draft summary", "Schedule review meeting"]

export function AiSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-2xl bg-muted p-6">
        <p className="text-4xl font-bold tracking-tight">
          AI in
          <br />
          Codist
        </p>
        <Card
          aria-hidden
          size="sm"
          className="absolute top-6 right-6 w-1/2 shadow-lg"
        >
          <CardContent className="flex flex-col gap-2 text-xs">
            <span className="flex items-center gap-1 font-medium">
              <SparklesIcon className="size-3.5" />
              Prepare Q3 review
            </span>
            {aiSteps.map((step) => (
              <span key={step} className="flex items-center gap-2">
                <span className="size-3 shrink-0 rounded-full border border-muted-foreground" />
                {step}
              </span>
            ))}
          </CardContent>
        </Card>
        <Button className="self-start px-4">
          <PlayIcon aria-hidden />
          Play
        </Button>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Smart features that feel magical
        </h2>
        <p className="max-w-md text-muted-foreground">
          See how Codist Assist works intelligently behind the scenes to
          transform scattered tasks into clear action plans.
        </p>
        <TextLink href="/ai">
          Learn more about our thoughtful approach to AI
        </TextLink>
      </div>
    </section>
  )
}
