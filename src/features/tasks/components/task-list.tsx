import { cn } from "@/lib/utils"
import type { MockTask } from "@/features/tasks/mock-data"

const priorityRing: Record<MockTask["priority"], string> = {
  1: "border-red-500",
  2: "border-orange-500",
  3: "border-blue-500",
  4: "border-muted-foreground/50",
}

export function TaskList({ tasks }: { tasks: MockTask[] }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-muted-foreground">No tasks.</p>
  }

  return (
    <ul className="divide-y border-y">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-start gap-3 py-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 size-4 shrink-0 rounded-full border-2",
              priorityRing[task.priority]
            )}
          />
          <div className="min-w-0">
            <p className="text-sm">{task.title}</p>
            {task.description && (
              <p className="text-xs text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
