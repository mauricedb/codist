import { Suspense } from "react"
import { createTaskAction } from "@/features/tasks/actions"
import { AddTaskForm } from "@/features/tasks/components/add-task-form"
import { TaskList } from "@/features/tasks/components/task-list"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { getOverdueTasks, getTodayTasks } from "@/features/tasks/queries"
import { getToday } from "@/features/tasks/today"

export default function TodayPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Today</h1>
      <Suspense fallback={<TaskListSkeleton />}>
        <TodayTasks />
      </Suspense>
    </>
  )
}

async function TodayTasks() {
  const today = await getToday()
  const [overdueTasks, todayTasks] = await Promise.all([
    getOverdueTasks(today),
    getTodayTasks(today),
  ])

  return (
    <>
      {overdueTasks.length > 0 && (
        <section aria-labelledby="overdue-heading" className="mb-8">
          <h2 id="overdue-heading" className="mb-2 text-sm font-bold">
            Overdue
          </h2>
          <TaskList tasks={overdueTasks} />
        </section>
      )}
      <section aria-labelledby="today-heading">
        <h2 id="today-heading" className="mb-2 text-sm font-bold">
          Today
        </h2>
        <TaskList tasks={todayTasks} />
        <AddTaskForm
          today={today}
          defaultDueDate={today}
          createTask={createTaskAction}
        />
      </section>
    </>
  )
}
