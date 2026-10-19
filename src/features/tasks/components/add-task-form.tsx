"use client"

import { useActionState, useId, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { ActionResult } from "@/lib/action-result"
import { cn } from "@/lib/utils"
import {
  addDays,
  daysBetween,
  formatDueLabel,
  fromPickerDate,
  getDueStatus,
  toPickerDate,
  type DueStatus,
} from "@/features/tasks/due-date"
import { parseDueDate, removeDuePhrase } from "@/features/tasks/parse-due-date"

type CreateTask = (
  previous: ActionResult<{ id: string }> | null,
  formData: FormData
) => Promise<ActionResult<{ id: string }>>

const dueColor: Record<DueStatus, string> = {
  overdue: "text-destructive",
  today: "text-success",
  upcoming: "text-muted-foreground",
}

function formatChipLabel(today: string, dueDate: string) {
  const dueInDays = daysBetween(today, dueDate)
  return Math.abs(dueInDays) <= 7
    ? formatDueLabel(dueInDays)
    : format(toPickerDate(dueDate), "d MMM yyyy")
}

// Monday of next week, as Todoist's "Next week" shortcut.
function nextMonday(today: string) {
  const weekday = new Date(`${today}T00:00:00Z`).getUTCDay()
  return addDays(today, (8 - weekday) % 7 || 7)
}

export function AddTaskForm({
  today,
  defaultDueDate,
  createTask,
}: {
  today: string
  // Due date for new tasks when none is typed or picked.
  defaultDueDate?: string
  createTask: CreateTask
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState("")
  // undefined: not picked, so the date comes from the text. null: no date.
  const [pickedDate, setPickedDate] = useState<string | null>()
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<
    ActionResult<{ id: string }> | null,
    FormData
  >(async (previous, formData) => {
    const result = await createTask(previous, formData)
    if (result.ok) {
      setText("")
      setPickedDate(undefined)
    }
    return result
  }, null)
  const inputId = useId()
  const errorId = useId()

  const phrase = pickedDate === undefined ? parseDueDate(text, today) : null
  const dueDate =
    pickedDate !== undefined ? pickedDate : (phrase?.dueDate ?? defaultDueDate ?? null)
  const title = phrase ? removeDuePhrase(text, phrase) : text.trim()
  const error = state?.ok === false
    ? (state.fieldErrors?.title?.[0] ?? state.error)
    : null

  function close() {
    setIsOpen(false)
    setText("")
    setPickedDate(undefined)
  }

  function pick(date: string | null) {
    setPickedDate(date)
    setIsPickerOpen(false)
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        className="mt-2 -ml-2.5 text-muted-foreground hover:text-primary"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon aria-hidden className="text-primary" />
        Add task
      </Button>
    )
  }

  return (
    <form
      action={formAction}
      className="mt-3 rounded-lg border p-3 focus-within:border-ring"
    >
      <label htmlFor={inputId} className="sr-only">
        Task name
      </label>
      <Input
        id={inputId}
        autoFocus
        autoComplete="off"
        placeholder="e.g. Pay rent in two days"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") close()
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="border-0 px-0 text-sm font-medium shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="dueDate" value={dueDate ?? ""} />
      {phrase && (
        <p className="mt-1 text-xs text-muted-foreground">
          Due date from “{text.slice(phrase.start, phrase.end)}”
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}

      <div className="mt-3 flex items-center gap-1">
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  dueDate && dueColor[getDueStatus(daysBetween(today, dueDate))]
                )}
              />
            }
          >
            <CalendarIcon aria-hidden />
            {dueDate ? (
              <>
                <span className="sr-only">Due: </span>
                {formatChipLabel(today, dueDate)}
              </>
            ) : (
              "Due date"
            )}
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <div className="flex flex-col border-b p-1">
              {[
                { label: "Today", date: today },
                { label: "Tomorrow", date: addDays(today, 1) },
                { label: "Next week", date: nextMonday(today) },
              ].map((option) => (
                <Button
                  key={option.label}
                  variant="ghost"
                  size="sm"
                  className="justify-between"
                  onClick={() => pick(option.date)}
                >
                  {option.label}
                  <span className="text-muted-foreground">
                    {format(toPickerDate(option.date), "EEE d MMM")}
                  </span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => pick(null)}
              >
                No date
              </Button>
            </div>
            <Calendar
              mode="single"
              today={toPickerDate(today)}
              selected={dueDate ? toPickerDate(dueDate) : undefined}
              defaultMonth={toPickerDate(dueDate ?? today)}
              disabled={{ before: toPickerDate(today) }}
              onSelect={(date) => pick(date ? fromPickerDate(date) : null)}
            />
          </PopoverContent>
        </Popover>
        {dueDate && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Remove due date"
            onClick={() => setPickedDate(null)}
          >
            <XIcon aria-hidden />
          </Button>
        )}

        <div className="ml-auto flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={!title || isPending}>
            Add task
          </Button>
        </div>
      </div>
    </form>
  )
}
