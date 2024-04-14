import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { usePostPublicationSchema } from '@/layouts/local/ui/CreatePost/PostPublication/schema/postPublicationSchema'
import { usePublishPostMutation } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const dispatch = useAppDispatch()

  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [publishPhotos, { isLoading: isLoadingPublication }] = usePublishPostMutation()

  const { postPublicationSchema } = usePostPublicationSchema()

  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()

  type postPublicationFormSchema = z.infer<typeof postPublicationSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<postPublicationFormSchema>({
    defaultValues: {
      postDescription: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(postPublicationSchema),
  })

  const postDescription = watch('postDescription')
  const { postDescription: errorDescription } = errors

  const handlePublishPhotos = () => {
    if (postPhotos.length > 0) {
      publishPhotos({ file: postPhotos })
        .unwrap()
        .then(() => {
          dispatch(postActions.setIsCreatePostModal(false))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const showModalSaveDraft = () => {
    setIsOpenModal(true)
  }

  const onDiscard = () => {
    setIsOpenModal(false)
  }

  const onSaveDraft = () => {
    setIsOpenModal(false)
    dispatch(postActions.setIsCreatePostModal(false))
    dispatch(postActions.setClearPostPhotos())
  }

  const backToFilter = () => {
    dispatch(postActions.setModalSteps('filters'))
  }

  return {
    backToFilter,
    control,
    errorDescription,
    getProfile,
    handlePublishPhotos,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    isOpenModal,
    locale,
    modalSteps,
    onDiscard,
    onSaveDraft,
    postDescription,
    postPhotos,
    showModalSaveDraft,
    t,
  }
}
