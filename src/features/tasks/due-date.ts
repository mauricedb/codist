// Due dates are calendar dates ("YYYY-MM-DD") in the user's time zone.

export const TIME_ZONE = "Europe/Amsterdam"

const DAY_MS = 24 * 60 * 60 * 1000

// en-CA formats as YYYY-MM-DD.
const calendarDateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

export type DueStatus = "overdue" | "today" | "upcoming"

export function toCalendarDate(date: Date) {
  return calendarDateFormat.format(date)
}

function toUtcMidnight(calendarDate: string) {
  return Date.parse(`${calendarDate}T00:00:00Z`)
}

export function addDays(calendarDate: string, days: number) {
  return new Date(toUtcMidnight(calendarDate) + days * DAY_MS)
    .toISOString()
    .slice(0, 10)
}

export function daysBetween(from: string, to: string) {
  return Math.round((toUtcMidnight(to) - toUtcMidnight(from)) / DAY_MS)
}

export function getDueStatus(dueInDays: number): DueStatus {
  if (dueInDays < 0) return "overdue"
  if (dueInDays === 0) return "today"
  return "upcoming"
}

export function formatDueLabel(dueInDays: number) {
  if (dueInDays === 0) return "Today"
  if (dueInDays === -1) return "Yesterday"
  if (dueInDays === 1) return "Tomorrow"
  return dueInDays < 0
    ? `${-dueInDays} days ago`
    : `In ${dueInDays} days`
}
