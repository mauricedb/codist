"use client"

import { startTransition, useOptimistic, useState } from "react"
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
  4: "border-ring",
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
    <li className="flex min-h-14 items-center gap-3.5 rounded-lg border border-border/60 bg-card px-4 py-3">
      <Checkbox
        checked={done}
        onCheckedChange={handleCheckedChange}
        aria-labelledby={titleId}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "size-4.5 rounded-[5px] border-[1.5px] after:-inset-3.5",
          priorityRing[task.priority]
        )}
      />
      <div className={cn("min-w-0 flex-1", done && "text-muted-foreground")}>
        <p id={titleId} className={cn(done && "line-through")}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
      {task.dueInDays !== undefined && (
        <p
          className={cn(
            "shrink-0 font-mono text-xs lowercase",
            done ? "text-muted-foreground" : dueColor[getDueStatus(task.dueInDays)]
          )}
        >
          <span className="sr-only">Due: </span>
          {formatDueLabel(task.dueInDays)}
        </p>
      )}
    </li>
  )
}
