import { Suspense } from "react"
import { createTaskAction } from "@/features/tasks/actions"
import { AddTaskForm } from "@/features/tasks/components/add-task-form"
import { TaskList } from "@/features/tasks/components/task-list"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { getInboxTasks } from "@/features/tasks/queries"
import { getToday } from "@/features/tasks/today"

export default function InboxPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Inbox</h1>
      <Suspense fallback={<TaskListSkeleton />}>
        <InboxTasks />
      </Suspense>
    </>
  )
}

async function InboxTasks() {
  const today = await getToday()
  return (
    <>
      <TaskList tasks={await getInboxTasks(today)} />
      <AddTaskForm today={today} createTask={createTaskAction} />
    </>
  )
}
