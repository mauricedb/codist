import "server-only"

import { io } from "next/cache"
import { toCalendarDate } from "@/features/tasks/due-date"

// Today's calendar date in the user's time zone. Reading the clock is
// request-time work, so `io()` keeps it out of the static shell. Pass the
// result into cached queries so it becomes part of their cache key.
export async function getToday() {
  await io()
  return toCalendarDate(new Date())
}
