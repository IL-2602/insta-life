import { useEffect, useState } from 'react'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetPublicUserProfileQuery } from '@/services/publicService/publicEndpoints'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetUserInfoQuery,
} from '@/services/usersService/usersEndpoints'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }
  const [username, setUsername] = useState<null | string>(null)

  const { query } = useRouter()
  const profileId = query?.id as string

  const { data, isError, isLoading } = useGetPublicUserProfileQuery({ profileId: +profileId })

  useEffect(() => {
    if (data) {
      setUsername(data.userName)
    }
  }, [data])

  const { data: followers, isLoading: isFollowersLoading } = useGetUserFollowersQuery(
    { username: data?.userName || '' },
    { skip: !username }
  )

  const { data: following, isLoading: isFollowingLoading } = useGetUserFollowingQuery(
    { username: data?.userName || '' },
    { skip: !username }
  )

  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfoQuery({
    username: data?.userName || '',
  })

  const followersCount = followers?.totalCount
  const followingCount = following?.totalCount
  const publicationsCount = userInfo?.publicationsCount

  const isFollowLoading = isFollowersLoading || isFollowingLoading || isUserInfoLoading

  return {
    data,
    followersCount,
    followingCount,
    isError,
    isFollowLoading,
    isLoading,
    me,
    publicationsCount,
  }
}
