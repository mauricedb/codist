export function PageHeader({
  title,
  meta,
  description,
}: {
  title: string
  // Short mono status line, e.g. "5 open".
  meta?: React.ReactNode
  description?: string
}) {
  return (
    <header className="mb-8 flex flex-col gap-2.5 md:mb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-4xl leading-none font-semibold tracking-[-0.04em] md:text-[2.75rem]">
          {title}
        </h1>
        {meta && (
          <p className="font-mono text-[0.8125rem] text-muted-foreground">{meta}</p>
        )}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </header>
  )
}
