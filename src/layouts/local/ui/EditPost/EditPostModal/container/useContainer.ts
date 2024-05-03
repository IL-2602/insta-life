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
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  //const postPhotos = useAppSelector(state => state.postReducer.postPhotos)
  const { isEditPostModal } = useAppSelector(state => state.postReducer)
  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()
  const [editPost, { isLoading: isLoadingEditPost }] = useEditPostMutation()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const { query } = useRouter()
  const { editPostSchema } = useEditPostSchema()

  type editPostFormSchema = z.infer<typeof editPostSchema>
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<editPostFormSchema>({
    defaultValues: {
      editPostDescription: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(editPostSchema),
  })

  const dispatch = useAppDispatch()

  const editPostDescription = watch('editPostDescription')
  const { editPostDescription: errorDescription } = errors

  const openEditPostModal = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const postId = query?.postId as string | undefined
  const { data: postPhotos, error, isLoading } = useGetCurrentPostQuery(Number(postId))
  const updatePost = () => {
    console.log('UPDATE DESCRIPTION : ', editPostDescription, 'POST ID : ', Number(postId))

    if (editPostDescription) {
      editPost({ description: editPostDescription, postId: Number(postId) })
        .unwrap()
        .then((res: any) => {
          dispatch(postActions.setIsEditPostModal(false))
          reset({ editPostDescription: '' })
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
  }
  const closeModalWithRefresh = () => {
    dispatch(postActions.setIsEditPostModal(false))
    setIsOpenClosePostModal(false)
    reset({ editPostDescription: '' })
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
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
    isLoadingEditPost,
    isOpenClosePostModal,
    onChangeCurrPhoto,
    openEditPostModal,
    postPhotos,
    t,
    updatePost,
  }
}
