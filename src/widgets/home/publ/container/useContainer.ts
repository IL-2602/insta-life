import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} from '@/services/usersService/usersEndpoints'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }

  const { data: followers } = useGetUserFollowersQuery({
    username: me?.userName,
  })

  const { data: following } = useGetUserFollowingQuery({
    pageNumber: 1,
    pageSize: 12,
    username: me?.userName,
  })

  return { followers, me }
}
