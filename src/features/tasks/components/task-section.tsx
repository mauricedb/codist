import { cn } from "@/lib/utils"

export function TaskSection({
  id,
  title,
  count,
  tone = "default",
  children,
}: {
  id: string
  title: string
  count: number
  tone?: "default" | "overdue"
  children: React.ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section aria-labelledby={headingId} className="mb-10 flex flex-col gap-2">
      <h2
        id={headingId}
        className={cn(
          "mb-1 flex justify-between border-b pb-2.5 font-mono text-xs font-medium tracking-[0.06em] uppercase",
          tone === "overdue" ? "text-destructive" : "text-muted-foreground"
        )}
      >
        <span>{title}</span>
        <span>
          <span className="sr-only">, </span>
          {count}
        </span>
      </h2>
      {children}
    </section>
  )
}
