"use server"

import { updateTag } from "next/cache"
import { z } from "zod"
import type { ActionResult } from "@/lib/action-result"
import { completeTask } from "@/features/tasks/mutations"
import { completeTaskSchema } from "@/features/tasks/schemas"

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
