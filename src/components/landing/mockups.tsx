import { CheckIcon, CornerDownLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Decorative app preview; hidden from assistive tech.

type Task = { title: string; due?: string; overdue?: boolean; done?: boolean }

const tasks: Task[] = [
  { title: "Reply to landlord about heating", due: "overdue", overdue: true },
  { title: "Review Q4 budget draft", due: "today" },
  { title: "Call Mum", due: "today" },
  { title: "Renew library books", done: true },
]

function TaskRow({ title, due, overdue, done }: Task) {
  return (
    <li
      className={cn(
        "flex items-center gap-3.5 rounded-lg px-4 py-3.5",
        done ? "text-muted-foreground" : "bg-card"
      )}
    >
      <span
        className={cn(
          "flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-ring",
          done && "border-primary bg-primary text-primary-foreground"
        )}
      >
        {done && <CheckIcon strokeWidth={3} className="size-3" />}
      </span>
      <span className={cn("flex-1", done && "line-through")}>{title}</span>
      {due && (
        <span
          className={cn(
            "font-mono text-xs",
            overdue ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {due}
        </span>
      )}
    </li>
  )
}

export function TodayPreview() {
  return (
    <div
      aria-hidden
      className="flex min-w-0 flex-col gap-4 rounded-2xl border bg-background p-6 shadow-[0_24px_48px_-28px_rgb(50_40_30/0.3)]"
    >
      <div className="flex items-center justify-between font-mono text-[0.8125rem] text-muted-foreground">
        <span>TODAY — MON 19 OCT</span>
        <span>3 open</span>
      </div>
      <div className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-foreground bg-card px-4 py-3.5">
        <span className="min-w-0 flex-1">
          Book train to Utrecht{" "}
          <span className="rounded bg-brand-soft px-1.5 py-px text-brand-soft-foreground">
            friday
          </span>
        </span>
        <span className="rounded-md border px-1.5 py-0.5 text-muted-foreground">
          <CornerDownLeftIcon className="size-3" />
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskRow key={task.title} {...task} />
        ))}
      </ul>
    </div>
  )
}
