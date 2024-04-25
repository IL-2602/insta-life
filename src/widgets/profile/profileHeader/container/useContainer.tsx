import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { useGetPublicUserProfileQuery } from '@/services/publicProfileSerice/publicProfileEndpoints'
import { useRouter } from 'next/router'
import { UserType } from '@/services/authService/lib/authEndpoints.types'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }
  const { query } = useRouter()
  const profileId = query?.id as string

  const { data, isError, isLoading } = useGetPublicUserProfileQuery({ profileId: +profileId })

  return { data, isError, isLoading, me }
}
