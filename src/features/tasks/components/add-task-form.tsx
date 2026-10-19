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
        variant="outline"
        className="h-12 w-full justify-start gap-3 border-dashed border-input bg-transparent px-4 text-base text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon aria-hidden className="size-4.5 text-brand" />
        Add task
      </Button>
    )
  }

  return (
    <form
      action={formAction}
      className="mt-2 rounded-xl border-[1.5px] border-foreground bg-card px-4 pt-3 pb-3.5 shadow-[0_12px_28px_-18px_rgb(50_40_30/0.35)]"
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
        className="h-auto border-0 px-0 py-1 text-[1.0625rem] font-medium shadow-none focus-visible:ring-0 md:text-[1.0625rem] dark:bg-transparent"
      />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="dueDate" value={dueDate ?? ""} />
      {phrase && (
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">
          Due date from{" "}
          <span className="rounded bg-brand-soft px-1.5 py-px text-brand-soft-foreground">
            “{text.slice(phrase.start, phrase.end)}”
          </span>
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-[0.8125rem] text-destructive">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
        <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className={cn(
                  "h-10 border-foreground px-3",
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
            <div className="flex flex-col border-b p-1.5">
              {[
                { label: "Today", date: today },
                { label: "Tomorrow", date: addDays(today, 1) },
                { label: "Next week", date: nextMonday(today) },
              ].map((option) => (
                <Button
                  key={option.label}
                  variant="ghost"
                  className="h-10 justify-between px-2.5 font-normal"
                  onClick={() => pick(option.date)}
                >
                  {option.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {format(toPickerDate(option.date), "EEE d MMM")}
                  </span>
                </Button>
              ))}
              <Button
                variant="ghost"
                className="h-10 justify-start px-2.5 font-normal"
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
              className="p-3.5 [--cell-size:--spacing(8.5)]"
              classNames={{
                weekday:
                  "flex-1 font-mono text-[0.6875rem] text-muted-foreground select-none",
                today:
                  "rounded-(--cell-radius) font-semibold ring-[1.5px] ring-foreground ring-inset",
              }}
            />
          </PopoverContent>
        </Popover>
        {dueDate && (
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label="Remove due date"
            onClick={() => setPickedDate(null)}
          >
            <XIcon aria-hidden />
          </Button>
        )}

        <div className="ml-auto flex gap-2">
          <Button type="button" variant="outline" className="h-10 px-4" onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-10 px-4 font-semibold"
            disabled={!title || isPending}
          >
            Add task
          </Button>
        </div>
      </div>
    </form>
  )
}
