const features = [
  {
    title: "Natural-language dates",
    description:
      "Type “tomorrow” or “next monday” and the due date fills itself in. Prefer a calendar? The picker is one click away.",
  },
  {
    title: "A Today view that stays short",
    description:
      "Only what's due now, with overdue items clearly marked. No dashboards, no streaks, no noise.",
  },
  {
    title: "An Inbox for loose ends",
    description:
      "Every open task lives here, dated or not, so nothing gets lost and nothing crowds your day.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-y bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-24 md:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.035em] md:text-5xl">
            Everything you need. Nothing that asks for attention.
          </h2>
          <p className="font-mono text-[0.8125rem] text-muted-foreground">
            0{features.length} features
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {features.map(({ title, description }, index) => (
            <li
              key={title}
              className="flex flex-col gap-3 border-t-2 border-foreground pt-6"
            >
              <span className="font-mono text-[0.8125rem] text-brand">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
