import { z } from "zod"

export const completeTaskSchema = z.object({
  id: z.string().min(1),
})

export type CompleteTaskInput = z.infer<typeof completeTaskSchema>
