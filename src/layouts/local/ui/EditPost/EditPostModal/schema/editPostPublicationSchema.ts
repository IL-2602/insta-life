import { useTranslation } from '@/shared/hooks/useTranslation'
import { z } from 'zod'

export const useEditPostSchema = () => {
  const { t } = useTranslation()

  const editPostSchema = z.object({
    editPostDescription: z.string().trim().max(500, t.modal.postDescriptionValueMax).nullable(),
  })

  return {
    editPostSchema,
  }
}
