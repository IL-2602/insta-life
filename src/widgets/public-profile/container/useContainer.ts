import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'
import { useGetPublicUserProfileQuery } from '@/services/publicProfileSerice/publicProfileEndpoints'

export const useContainer = () => {
  const { t } = useTranslation()

  const { query } = useRouter()

  const profileId = query?.id as string

  const { data: publicProfile } = useGetPublicUserProfileQuery({
    profileId: +profileId,
  })

  return { t, publicProfile }
}
