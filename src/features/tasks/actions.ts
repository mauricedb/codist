"use server"

import { updateTag } from "next/cache"
import { z } from "zod"
import type { ActionResult } from "@/lib/action-result"
import { completeTask, createTask } from "@/features/tasks/mutations"
import { completeTaskSchema, createTaskSchema } from "@/features/tasks/schemas"

export async function createTaskAction(
  _previous: ActionResult<{ id: string }> | null,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const parsed = createTaskSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid task.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const task = await createTask(parsed.data)

  updateTag("tasks")
  return { ok: true, data: task }
}

export async function completeTaskAction(input: unknown): Promise<ActionResult> {
  const parsed = completeTaskSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid task.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const found = await completeTask(parsed.data.id)
  if (!found) {
    return { ok: false, error: "This task no longer exists." }
  }

  updateTag("tasks")
  return { ok: true, data: undefined }
}
