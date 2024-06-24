import { z } from 'zod'

export const messengerSchema = z.object({
  message: z.string().max(500),
})

export type MessengerFormSchema = z.infer<typeof messengerSchema>
