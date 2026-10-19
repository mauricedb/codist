"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
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

export function TaskRow({ task }: { task: TaskListItem }) {
  const [done, setDone] = useState(false)
  const titleId = `task-${task.id}-title`

  return (
    <li className="flex items-start gap-3 py-3">
      <Checkbox
        checked={done}
        onCheckedChange={setDone}
        aria-labelledby={titleId}
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
      </div>
    </li>
  )
}
