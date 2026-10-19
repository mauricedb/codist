import { Suspense } from "react"
import { format } from "date-fns"
import { createTaskAction } from "@/features/tasks/actions"
import { AddTaskForm } from "@/features/tasks/components/add-task-form"
import { PageHeader } from "@/features/tasks/components/page-header"
import { TaskList } from "@/features/tasks/components/task-list"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { TaskSection } from "@/features/tasks/components/task-section"
import { TodayEmptyState } from "@/features/tasks/components/today-empty-state"
import { toPickerDate } from "@/features/tasks/due-date"
import {
  getOverdueTasks,
  getTaskCounts,
  getTodayTasks,
} from "@/features/tasks/queries"
import { getToday } from "@/features/tasks/today"

export default function TodayPage() {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader title="Today" />
          <TaskListSkeleton />
        </>
      }
    >
      <TodayTasks />
    </Suspense>
  )
}

async function TodayTasks() {
  const today = await getToday()
  const [overdueTasks, todayTasks, counts] = await Promise.all([
    getOverdueTasks(today),
    getTodayTasks(today),
    getTaskCounts(today),
  ])
  const date = toPickerDate(today)
  const isClear = overdueTasks.length === 0 && todayTasks.length === 0

  return (
    <>
      <PageHeader
        title="Today"
        meta={`${counts.today} open · ${format(date, "EEEE d MMMM")}`}
      />
      {isClear ? (
        <TodayEmptyState inboxCount={counts.inbox} />
      ) : (
        <>
          {overdueTasks.length > 0 && (
            <TaskSection
              id="overdue"
              title="Overdue"
              count={overdueTasks.length}
              tone="overdue"
            >
              <TaskList tasks={overdueTasks} />
            </TaskSection>
          )}
          <TaskSection
            id="today"
            title={`Today · ${format(date, "EEE d MMM")}`}
            count={todayTasks.length}
          >
            <TaskList tasks={todayTasks} />
          </TaskSection>
        </>
      )}
      <AddTaskForm
        today={today}
        defaultDueDate={today}
        createTask={createTaskAction}
      />
    </>
  )
}
