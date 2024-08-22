import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetCurrentPostQuery, useGetLikesPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetUserInfoQuery, useUnSubscribeMutation } from '@/services/usersService/usersEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const {
    data: me,
    error: meError,
    isLoading: isMeLoading,
  } = useGetMeQuery() as {
    data: UserType
    error: FetchBaseQueryError | SerializedError
    isLoading: boolean
  }
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined
  const edit = query?.edit as boolean | undefined

  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })

  const { data: userInfo, isLoading: isGetUserInfoLoading } = useGetUserInfoQuery(
    { username: postPhotos?.userName! },
    { skip: !postPhotos?.userName }
  )

  const [unFollow] = useUnSubscribeMutation()

  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)

  const isEdit = (edit && postPhotos?.ownerId === me?.userId) || false

  const isShowOptions =
    ((postPhotos?.ownerId === me?.userId || userInfo?.isFollowing) && !meError) || false

  const isLoading = isMeLoading || isPostFetching || isGetUserInfoLoading

  const isFollowing = userInfo?.isFollowing || false
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  const setIsEditPostHandler = (edit: boolean) =>
    void replace({ query: { edit, id: query.id, postId } }, undefined, {
      shallow: true,
    })
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
  }

  const handleCloseModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsMyPostModal(false))
  }
  const handleClosePostModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
  }

  const handleOpenEditPostDialog = () => {
    dispatch(postActions.setIsCloseEditPostModal(true))
  }
  const handleUnFollow = () =>
    postPhotos && unFollow({ userId: postPhotos?.ownerId, username: postPhotos?.userName })

  useEffect(() => {
    if (postId) {
      dispatch(postActions.setIsMyPostModal(true))
    }
  }, [dispatch, postId])

  return {
    currPhotoIndex,
    deletePostModalHandler,
    handleCloseModal,
    handleClosePostModal,
    handleOpenEditPostDialog,
    handleUnFollow,
    isEdit,
    isFollowing,
    isLoading,
    isMyPostModal,
    isShowOptions,
    onChangeCurrPhoto,
    postId,
    postPhotos,
    setIsEditPostHandler,
    t,
  }
}
