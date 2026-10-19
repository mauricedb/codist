import Link from "next/link"
import { CheckIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function TodayEmptyState({ inboxCount }: { inboxCount: number }) {
  return (
    <section className="mb-2 flex flex-col items-center gap-4 rounded-2xl border bg-card px-8 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border-2 text-brand">
        <CheckIcon aria-hidden strokeWidth={3} className="size-7" />
      </span>
      <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">
        Today is clear.
      </h2>
      <p className="max-w-sm text-muted-foreground">
        Nothing due and nothing overdue. Take the rest of the day back, or plan
        something for tomorrow.
      </p>
      {inboxCount > 0 && (
        <Link
          href="/app/inbox"
          className={buttonVariants({
            variant: "outline",
            className: "mt-2 h-11 border-input bg-transparent px-4.5",
          })}
        >
          Open Inbox · {inboxCount}
        </Link>
      )}
    </section>
  )
}
