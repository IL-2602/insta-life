import { z } from 'zod'

export const messengerSchema = z.object({
  message: z.string().max(500),
  searchName: z.string().max(30),
})

export type MessengerFormSchema = z.infer<typeof messengerSchema>
