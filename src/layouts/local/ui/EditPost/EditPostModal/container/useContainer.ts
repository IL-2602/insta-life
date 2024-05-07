import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useEditPostSchema } from '@/layouts/local/ui/EditPost/EditPostModal/schema/editPostPublicationSchema'
import { useEditPostMutation, useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  const { isEditPostModal } = useAppSelector(state => state.postReducer)
  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()
  const [editPost, { isLoading: isLoadingEditPost }] = useEditPostMutation()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const { query } = useRouter()
  const { editPostSchema } = useEditPostSchema()

  type editPostFormSchema = z.infer<typeof editPostSchema>
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  const dispatch = useAppDispatch()

  const openEditPostModal = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const postId = query?.postId as string | undefined
  const { data: postPhotos, isLoading: isLoadingCurrentPost } = useGetCurrentPostQuery(
    Number(postId)
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<editPostFormSchema>({
    defaultValues: {
      editPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(editPostSchema),
  })

  const editPostDescription = watch('editPostDescription')

  const { editPostDescription: errorDescription } = errors

  const updatePost = () => {
    if (editPostDescription) {
      editPost({ description: editPostDescription, postId: Number(postId) })
        .unwrap()
        .then((res: any) => {
          reset({ editPostDescription })
          dispatch(postActions.setIsEditPostModal(false))
          toast.success('The post has been edit', {
            pauseOnHover: false,
            style: {
              background: '#0A6638',
              border: '1px solid #14CC70',
              color: 'white',
              fontSize: '14px',
            },
          })
        })
        .catch((err: any) => {
          toast.error('Error: The post has not been edit ', {
            pauseOnHover: false,
            style: {
              background: '#660A1D',
              border: '1px solid #CC1439',
              color: 'white',
              fontSize: '14px',
            },
          })
        })
    }
  }

  const handleCloseModal = () => {
    setIsOpenClosePostModal(true)
    reset({ editPostDescription: postPhotos?.description })
  }

  const closeModalWithRefresh = () => {
    dispatch(postActions.setIsEditPostModal(false))
    setIsOpenClosePostModal(false)
  }

  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
    reset({ editPostDescription: postPhotos?.description })
  }

  return {
    closeModalWithRefresh,
    control,
    currPhotoIndex,
    editPostDescription,
    errorDescription,
    getProfile,
    handleCloseModal,
    handleClosePostModal,
    handleSubmit,
    isEditPostModal,
    isGetUserLoading,
    isLoadingCurrentPost,
    isLoadingEditPost,
    isOpenClosePostModal,
    onChangeCurrPhoto,
    openEditPostModal,
    postPhotos,
    t,
    updatePost,
  }
}
