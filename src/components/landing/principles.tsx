const principles = [
  {
    title: "Fast to capture",
    description:
      "One field, one keystroke. Your thought is saved before it fades.",
  },
  {
    title: "Quiet by default",
    description:
      "No badges or nudges competing for you. Codist waits until you open it.",
  },
  {
    title: "Yours alone",
    description:
      "A personal list for one person. No teams, no sharing settings, no sign-up wall.",
  },
]

export function Principles() {
  return (
    <section
      id="principles"
      className="mx-auto grid max-w-7xl gap-16 px-4 py-24 md:px-8 lg:grid-cols-[1fr_2fr] lg:py-28"
    >
      <div>
        <p className="mb-4 font-mono text-[0.8125rem] text-muted-foreground">
          / principles
        </p>
        <h2 className="text-4xl leading-[1.08] font-semibold tracking-[-0.035em] md:text-[2.875rem]">
          Built to be put down.
        </h2>
      </div>
      <dl className="flex flex-col border-b">
        {principles.map(({ title, description }) => (
          <div
            key={title}
            className="grid gap-2 border-t py-6 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <dt className="font-semibold">{title}</dt>
            <dd className="text-muted-foreground">{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
