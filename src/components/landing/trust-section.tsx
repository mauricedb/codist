import { TextLink } from "./text-link"

const stats = [
  { value: "1+ million", label: "Pro users" },
  { value: "30+ million", label: "app downloads" },
  { value: "2+ billion", label: "tasks completed" },
]

export function TrustSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          In it for the long haul
        </p>
        <h2 className="text-3xl font-bold tracking-tight">
          A task manager you can trust for life
        </h2>
        <p className="max-w-md text-muted-foreground">
          We&apos;ve been building Codist for 19 years and 90 days. Rest
          assured that we&apos;ll never sell out to the highest bidder.
        </p>
        <TextLink href="/mission">Read about our long-term mission</TextLink>
      </div>
      <dl className="grid grid-cols-3 gap-3 text-center">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col-reverse gap-1 rounded-2xl bg-muted px-2 py-8"
          >
            <dt className="text-xs text-muted-foreground sm:text-sm">
              {label}
            </dt>
            <dd className="text-base font-bold sm:text-2xl">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
