"use client"

import { startTransition, useOptimistic, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { ActionResult } from "@/lib/action-result"
import { cn } from "@/lib/utils"
import type { CompleteTaskInput } from "@/features/tasks/schemas"
import {
  formatDueLabel,
  getDueStatus,
  type DueStatus,
} from "@/features/tasks/due-date"
import type { TaskListItem } from "@/features/tasks/queries"

const priorityRing: Record<TaskListItem["priority"], string> = {
  1: "border-red-500",
  2: "border-orange-500",
  3: "border-blue-500",
  4: "border-muted-foreground/50",
}

const dueColor: Record<DueStatus, string> = {
  overdue: "text-destructive",
  today: "text-success",
  upcoming: "text-muted-foreground",
}

export function TaskRow({
  task,
  completeTask,
}: {
  task: TaskListItem
  completeTask: (input: CompleteTaskInput) => Promise<ActionResult>
}) {
  // Rows only list incomplete tasks. On success the refreshed list drops
  // the row; on failure the transition ends and `done` reverts to false.
  const [done, setDone] = useOptimistic(false)
  const [error, setError] = useState<string | null>(null)
  const titleId = `task-${task.id}-title`
  const errorId = `task-${task.id}-error`

  function handleCheckedChange(checked: boolean) {
    if (!checked) return
    setError(null)
    startTransition(async () => {
      setDone(true)
      try {
        const result = await completeTask({ id: task.id })
        if (!result.ok) setError(result.error)
      } catch {
        setError("Couldn't complete the task. Try again.")
      }
    })
  }

  return (
    <li className="flex items-start gap-3 py-3">
      <Checkbox
        checked={done}
        onCheckedChange={handleCheckedChange}
        aria-labelledby={titleId}
        aria-describedby={error ? errorId : undefined}
        className={cn("mt-0.5 rounded-full border-2", priorityRing[task.priority])}
      />
      <div className={cn("min-w-0", done && "text-muted-foreground")}>
        <p id={titleId} className={cn("text-sm", done && "line-through")}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground">{task.description}</p>
        )}
        {task.dueInDays !== undefined && (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xs",
              done ? "text-muted-foreground" : dueColor[getDueStatus(task.dueInDays)]
            )}
          >
            <CalendarIcon aria-hidden className="size-3" />
            <span className="sr-only">Due: </span>
            {formatDueLabel(task.dueInDays)}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    </li>
  )
}
