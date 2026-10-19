import { TaskList } from "@/features/tasks/components/task-list"
import { getTodayTasks } from "@/features/tasks/mock-data"

export default function TodayPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Today</h1>
      <TaskList tasks={getTodayTasks()} />
    </>
  )
}
