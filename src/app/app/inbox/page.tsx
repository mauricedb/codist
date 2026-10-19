import { TaskList } from "@/features/tasks/components/task-list"
import { getInboxTasks } from "@/features/tasks/mock-data"

export default function InboxPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Inbox</h1>
      <TaskList tasks={getInboxTasks()} />
    </>
  )
}
