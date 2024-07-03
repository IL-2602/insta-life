import { useTranslation } from '@/shared/hooks/useTranslation'
import { z } from 'zod'

export const usePostSchema = () => {
  const { t } = useTranslation()

  const myPostSchema = z.object({
    comment: z.string().trim().max(300, t.modal.postDescriptionValueMax).optional(),
    myPostDescription: z.string().trim().max(300, t.modal.postDescriptionValueMax).nullable(),
  })

  return {
    myPostSchema,
  }
}
