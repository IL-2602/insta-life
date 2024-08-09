import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { useGetCurrentPostQuery, useGetLikesPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const { error: meError } = useGetMeQuery()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined
  const edit = query?.edit as boolean | undefined

  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })

  const { data: getProfile, isFetching: isGetUserLoading } = useGetProfileQuery()
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const isEdit = (edit && postPhotos?.ownerId === getProfile?.id) || false
  const isEditable = postPhotos?.ownerId === getProfile?.id

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

  const isLoading = isGetUserLoading || isPostFetching

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
    isEdit,
    isEditable,
    isLoading,
    isMyPostModal,
    meError,
    onChangeCurrPhoto,
    postId,
    postPhotos,
    setIsEditPostHandler,
    t,
  }
}
