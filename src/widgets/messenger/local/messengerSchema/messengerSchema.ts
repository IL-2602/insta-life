import { z } from 'zod'

export const messengerSchema = z.object({
  message: z.string(),
  searchName: z.string().max(30),
  userPhoto: z
    .custom<File>(v => v instanceof File)
    .refine(file => file.size <= 10485760, `imgLess10mb`)
    .refine(file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'imgFormat')
    .refine(async file => {
      const image = new Image()

      image.src = URL.createObjectURL(file)
      await new Promise(resolve => {
        image.onload = resolve
      })

      return image.width >= 360 && image.height >= 360 // Проверяем, что ширина  больше 360px и высота  больше 360px
    }, 'imgLarger360')
    .optional(),
})

export type MessengerFormSchema = z.infer<typeof messengerSchema>
