import { useTranslation } from '@/shared/hooks/useTranslation'
import { z } from 'zod'

export const useMyPostSchema = () => {
  const { t } = useTranslation()

  const myPostSchema = z.object({
    myPostDescription: z.string().trim().max(500, t.modal.postDescriptionValueMax).nullable(),
  })

  return {
    myPostSchema,
  }
}
