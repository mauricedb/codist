import type { TaskListItem } from "@/features/tasks/queries"
import { completeTaskAction } from "@/features/tasks/actions"
import { TaskRow } from "@/features/tasks/components/task-row"

export function TaskList({ tasks }: { tasks: TaskListItem[] }) {
  if (tasks.length === 0) {
    return <p className="px-1 py-3 text-muted-foreground">No tasks.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} completeTask={completeTaskAction} />
      ))}
    </ul>
  )
}
