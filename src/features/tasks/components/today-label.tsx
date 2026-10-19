import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toPickerDate } from "@/features/tasks/due-date"
import { getToday } from "@/features/tasks/today"

export async function TodayLabel({ className }: { className?: string }) {
  const today = await getToday()
  return (
    <p className={cn("font-mono text-xs text-muted-foreground lowercase", className)}>
      {format(toPickerDate(today), "EEE d MMM")}
    </p>
  )
}
