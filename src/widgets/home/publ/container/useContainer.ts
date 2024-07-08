import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} from '@/services/usersService/usersEndpoints'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }

  const { data: followers } = useGetUserFollowersQuery({
    pageSize: 1,
    username: me?.userName,
  })

  const { data: following } = useGetUserFollowingQuery({
    pageSize: 4,
    username: me?.userName,
  })

  return { following, me }
}
