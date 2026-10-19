import "server-only"

import { prisma } from "@/lib/prisma"

// Returns false when the task does not exist. Completing an already
// completed task keeps its original completedAt.
export async function completeTask(id: string) {
  const { count } = await prisma.task.updateMany({
    where: { id, completedAt: null },
    data: { completedAt: new Date() },
  })
  if (count > 0) return true
  return (await prisma.task.count({ where: { id } })) > 0
}
