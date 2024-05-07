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
  const { data: getProfile, isFetching: isGetUserLoading } = useGetProfileQuery()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)
  const { query, replace } = useRouter()
  const { myPostSchema } = useMyPostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
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
  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })

  const commentPublish = () => {}
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
    setIsEdit(false)
  }
  const editPostModalHandler = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const handleCloseModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsMyPostModal(false))
    setIsEdit(false)
  }
  const closeModalWithRefresh = () => {
    // void replace({ query: { id: query.id } }, undefined, {
    //   shallow: true,
    // })
    // dispatch(postActions.setIsEditPostModal(false))
    setIsOpenClosePostModal(false)
    setIsEdit(false)
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
    setIsEdit(false)
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
  }

  const handleOpenEditPostDialog = () => setIsOpenClosePostModal(true)
  const handleCloseEditPostDialog = () => setIsOpenClosePostModal(false)
  const setIsEditPostHandler = () => setIsEdit(p => !p)

  const isLoading = isGetUserLoading || isPostFetching

  return {
    closeModalWithRefresh,
    commentPublish,
    control,
    currPhotoIndex,
    deletePostModalHandler,
    editPostModalHandler,
    errorDescription,
    getProfile,
    handleCloseEditPostDialog,
    handleCloseModal,
    handleClosePostModal,
    handleOpenEditPostDialog,
    handleSubmit,
    isEdit,
    isGetUserLoading,
    isLoading,
    isMyPostModal,
    isOpenClosePostModal,
    isPostFetching,
    myPostDescription,
    onChangeCurrPhoto,
    openEditPostModal,
    postId,
    postPhotos,
    setIsEditPostHandler,
    t,
  }
}
