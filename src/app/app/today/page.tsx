import { TaskList } from "@/features/tasks/components/task-list"
import { getOverdueTasks, getTodayTasks } from "@/features/tasks/mock-data"

export default function TodayPage() {
  const overdueTasks = getOverdueTasks()

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Today</h1>
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
        <TaskList tasks={getTodayTasks()} />
      </section>
    </>
  )
}
