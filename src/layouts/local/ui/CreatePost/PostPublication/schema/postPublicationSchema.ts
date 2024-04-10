import { useTranslation } from '@/shared/hooks/useTranslation'
import { z } from 'zod'

export const usePostPublicationSchema = () => {
  const { t } = useTranslation()

  const postPublicationSchema = z.object({
    postDescription: z.string().trim().max(500, t.modal.postDescriptionValueMax).nullable(),
  })

  return {
    postPublicationSchema,
  }
}
