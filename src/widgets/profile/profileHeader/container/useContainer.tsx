import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { messageActions } from '@/services/messengerService/store/slice/messengerEndpoints.slice'
import { useGetPublicUserProfileQuery } from '@/services/publicService/publicEndpoints'
import {
  useGetUserInfoQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
} from '@/services/usersService/usersEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { data: me } = useGetMeQuery() as { data: UserType }
  const [isFollow, setIsFollow] = useState(false)

  const dispatch = useAppDispatch()

  const { push, query } = useRouter()
  const profileId = query?.id as string

  const { data, isError } = useGetPublicUserProfileQuery({ profileId: +profileId })

  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfoQuery({
    username: data?.userName || '',
  })

  const [subscribe, { isLoading: isSubLoading }] = useSubscribeMutation()
  const [unSubscribe, { isLoading: isUnSubLoading }] = useUnSubscribeMutation()

  const publicationsCount = userInfo?.publicationsCount
  const followersCount = userInfo?.followersCount
  const followingCount = userInfo?.followingCount

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

  const subscribeToUser = async () =>
    await subscribe({ selectedUserId: +profileId, username: data?.userName! })

  const unSubscribeToUser = async () =>
    await unSubscribe({ userId: +profileId, username: data?.userName! })

  const isFollowLoading = isUserInfoLoading
  const isSubscribeLoading = isSubLoading || isUnSubLoading

  return {
    data,
    followersCount,
    followingCount,
    isError,
    isFollow,
    isFollowLoading,
    isSubscribeLoading,
    me,
    onSendMessage,
    publicationsCount,
    subscribeToUser,
    unSubscribeToUser,
  }
}
