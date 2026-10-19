import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import type { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { daysBetween } from "@/features/tasks/due-date"

export type TaskListItem = {
  id: string
  title: string
  description?: string
  priority: 1 | 2 | 3 | 4
  // Days relative to today: negative is overdue, 0 is today, undefined is no date.
  dueInDays?: number
}

const taskListSelect = {
  id: true,
  title: true,
  dueDate: true,
} satisfies Prisma.TaskSelect

const taskListOrder: Prisma.TaskOrderByWithRelationInput[] = [
  { createdAt: "asc" },
  { id: "asc" },
]

function toTaskListItem(
  task: { id: string; title: string; dueDate: string | null },
  today: string
): TaskListItem {
  return {
    id: task.id,
    title: task.title,
    // The Task model has no priority yet; 4 is the "no priority" level.
    priority: 4,
    dueInDays:
      task.dueDate === null ? undefined : daysBetween(today, task.dueDate),
  }
}

export async function getOverdueTasks(today: string) {
  "use cache"
  cacheLife("seconds")
  cacheTag("tasks")

  const tasks = await prisma.task.findMany({
    where: { completedAt: null, dueDate: { lt: today } },
    select: taskListSelect,
    orderBy: [{ dueDate: "asc" }, ...taskListOrder],
  })
  return tasks.map((task) => toTaskListItem(task, today))
}

export async function getTodayTasks(today: string) {
  "use cache"
  cacheLife("seconds")
  cacheTag("tasks")

  const tasks = await prisma.task.findMany({
    where: { completedAt: null, dueDate: today },
    select: taskListSelect,
    orderBy: taskListOrder,
  })
  return tasks.map((task) => toTaskListItem(task, today))
}

export async function getInboxTasks(today: string) {
  "use cache"
  cacheLife("seconds")
  cacheTag("tasks")

  const tasks = await prisma.task.findMany({
    where: { completedAt: null },
    select: taskListSelect,
    orderBy: taskListOrder,
  })
  return tasks.map((task) => toTaskListItem(task, today))
}
