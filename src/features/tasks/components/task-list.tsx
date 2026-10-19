import type { TaskListItem } from "@/features/tasks/queries"
import { TaskRow } from "@/features/tasks/components/task-row"

export function TaskList({ tasks }: { tasks: TaskListItem[] }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-muted-foreground">No tasks.</p>
  }

  return (
    <ul className="divide-y border-y">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  )
}
