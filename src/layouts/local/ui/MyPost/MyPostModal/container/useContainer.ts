import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useMyPostSchema } from '@/layouts/local/ui/MyPost/MyPostModal/schema/myPostPublicationSchema'
import { useEditPostMutation, useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined

  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })
  const { data: getProfile, isFetching: isGetUserLoading } = useGetProfileQuery()
  const [editPost, { isLoading: isLoadingEditPost }] = useEditPostMutation()

  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  const { myPostSchema } = useMyPostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<myPostFormSchema>({
    defaultValues: {
      myPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })
  const myPostDescription = watch('myPostDescription')
  const { myPostDescription: errorDescription } = errors

  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)
  const commentPublish = () => {}
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
    setIsEdit(false)
  }

  const handleCloseModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsMyPostModal(false))
    setIsEdit(false)
  }
  const closeModalWithRefresh = () => {
    setIsOpenClosePostModal(false)
    setIsEdit(false)
    reset({ myPostDescription: postPhotos?.description })
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
    setIsEdit(false)
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
  }

  const updatePost = () => {
    if (myPostDescription !== postPhotos?.description) {
      editPost({ description: myPostDescription, postId: Number(postId) })
        .unwrap()
        .then(() => {
          reset({ myPostDescription })
          setIsEdit(false)
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
    } else {
      setIsEdit(false)
    }
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
    errorDescription,
    getProfile,
    handleCloseEditPostDialog,
    handleCloseModal,
    handleClosePostModal,
    handleOpenEditPostDialog,
    isEdit,
    isGetUserLoading,
    isLoading,
    isLoadingEditPost,
    isMyPostModal,
    isOpenClosePostModal,
    myPostDescription,
    onChangeCurrPhoto,
    postId,
    postPhotos,
    setIsEditPostHandler,
    t,
    updatePost,
  }
}
