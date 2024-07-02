import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { messageActions } from '@/services/messengerService/store/slice/messengerEndpoints.slice'
import {
  useGetPublicUserProfileQuery,
  useGetUserPostsQuery,
} from '@/services/publicService/publicEndpoints'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetUserInfoQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
} from '@/services/usersService/usersEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }
  const [username, setUsername] = useState<null | string>(null)
  const [isFollow, setIsFollow] = useState(false)

  const dispatch = useAppDispatch()

  const { push, query } = useRouter()
  const profileId = query?.id as string

  const { data, isError } = useGetPublicUserProfileQuery({ profileId: +profileId })

  useEffect(() => {
    if (data) {
      setUsername(data.userName)
    }
  }, [data])

  const { data: followers, isLoading: isFollowersLoading } = useGetUserFollowersQuery(
    { username: data?.userName! },
    { skip: !username }
  )

  const { data: following, isLoading: isFollowingLoading } = useGetUserFollowingQuery({
    username: data?.userName || '',
  })

  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfoQuery({
    username: data?.userName || '',
  })

  const { data: posts, isLoading: isPostsLoading } = useGetUserPostsQuery({
    endCursorPostId: undefined,
    pageSize: 12,
    userId: +profileId,
  })

  const [subscribe, { isLoading: isSubLoading }] = useSubscribeMutation()
  const [unSubscribe, { isLoading: isUnSubLoading }] = useUnSubscribeMutation()

  const followersCount = followers?.totalCount
  const followingCount = following?.totalCount
  const publicationsCount = userInfo?.publicationsCount

  useEffect(() => {
    if (userInfo) {
      setIsFollow(userInfo.isFollowing)
    }
  }, [userInfo])

  const onSendMessage = () => {
    if (!data) {
      return null
    }

    const infoMessage: Message = {
      avatars: data.avatars,
      createdAt: new Date().toString(),
      id: data.id,
      messageText: '',
      messageType: 'TEXT',
      ownerId: me.userId,
      receiverId: data.id,
      status: 'READ',
      updatedAt: new Date().toString(),
      userName: data.userName,
    } as const

    dispatch(messageActions.setFirstMessage(infoMessage))

    void push(ROUTES.MESSENGER + `?sent=${profileId}`)
  }

  const subscribeToUser = async () => {
    try {
      return await subscribe({ selectedUserId: +profileId })
    } catch (e) {
      console.error(e)
    }
  }

  const unSubscribeToUser = async () => {
    try {
      return await unSubscribe({ userId: +profileId })
    } catch (e) {
      console.error(e)
    }
  }

  const isFollowLoading = isFollowersLoading || isFollowingLoading || isUserInfoLoading
  const isSubscribeLoading = isSubLoading || isUnSubLoading

  return {
    data,
    followersCount,
    followingCount,
    isError,
    isFollow,
    isFollowLoading,
    isPostsLoading,
    isSubscribeLoading,
    me,
    onSendMessage,
    publicationsCount,
    subscribeToUser,
    unSubscribeToUser,
  }
}
