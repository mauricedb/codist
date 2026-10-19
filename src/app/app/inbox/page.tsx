import { Suspense } from "react"
import { createTaskAction } from "@/features/tasks/actions"
import { AddTaskForm } from "@/features/tasks/components/add-task-form"
import { PageHeader } from "@/features/tasks/components/page-header"
import { TaskList } from "@/features/tasks/components/task-list"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { getInboxTasks } from "@/features/tasks/queries"
import { getToday } from "@/features/tasks/today"

const description = "Every open task, dated or not."

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader title="Inbox" description={description} />
          <TaskListSkeleton />
        </>
      }
    >
      <InboxTasks />
    </Suspense>
  )
}

async function InboxTasks() {
  const today = await getToday()
  const tasks = await getInboxTasks(today)

  return (
    <>
      <PageHeader
        title="Inbox"
        meta={`${tasks.length} open`}
        description={description}
      />
      <div className="mb-2">
        <TaskList tasks={tasks} />
      </div>
      <AddTaskForm today={today} createTask={createTaskAction} />
    </>
  )
}
