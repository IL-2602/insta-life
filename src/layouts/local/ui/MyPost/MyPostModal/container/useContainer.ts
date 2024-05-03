import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useMyPostSchema } from '@/layouts/local/ui/MyPost/MyPostModal/schema/myPostPublicationSchema'
import { useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  //const postPhotos = useAppSelector(state => state.postReducer.postPhotos)
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)
  const { query, replace } = useRouter()
  const { myPostSchema } = useMyPostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<myPostFormSchema>({
    defaultValues: {
      myPostDescription: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const dispatch = useAppDispatch()

  const myPostDescription = watch('myPostDescription')
  const { myPostDescription: errorDescription } = errors

  const openEditPostModal = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  // запрос и прокинуть пост фотос
  const postId = query?.postId as string | undefined
  const { data: postPhotos, error, isLoading } = useGetCurrentPostQuery(Number(postId))

  const commentPublish = () => {}
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
  }
  const editPostModalHandler = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const handleCloseModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsMyPostModal(false))
  }
  const closeModalWithRefresh = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsEditPostModal(false))
    setIsOpenClosePostModal(false)
    reset({ myPostDescription: '' })
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
  }

  return {
    closeModalWithRefresh,
    commentPublish,
    control,
    currPhotoIndex,
    deletePostModalHandler,
    editPostModalHandler,
    errorDescription,
    getProfile,
    handleCloseModal,
    handleClosePostModal,
    handleSubmit,
    isGetUserLoading,
    isMyPostModal,
    isOpenClosePostModal,
    myPostDescription,
    onChangeCurrPhoto,
    openEditPostModal,
    postPhotos,
    t,
  }
}
