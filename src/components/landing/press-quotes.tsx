const quotes = [
  { quote: "Simple, straightforward, and super powerful", source: "The Verge" },
  { quote: "The best to-do list app on the market", source: "PC Mag" },
  { quote: "Nothing short of stellar", source: "TechRadar" },
]

export function PressQuotes() {
  return (
    <section aria-label="Press" className="bg-muted/50 py-12">
      <ul className="mx-auto grid max-w-6xl gap-10 px-4 text-center md:grid-cols-3 md:px-8">
        {quotes.map(({ quote, source }) => (
          <li key={source}>
            <figure className="flex flex-col items-center gap-3">
              <blockquote className="font-serif text-lg italic">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {source}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
