import { z } from "zod"

export const completeTaskSchema = z.object({
  id: z.string().min(1),
})

export type CompleteTaskInput = z.infer<typeof completeTaskSchema>

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Task name is required.").max(500),
  // Forms send "" for no due date.
  dueDate: z.preprocess(
    (value) => (value === "" ? null : value),
    z.iso.date().nullable()
  ),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
