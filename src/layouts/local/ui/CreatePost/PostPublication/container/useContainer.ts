import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { usePostPublicationSchema } from '@/layouts/local/ui/CreatePost/PostPublication/schema/postPublicationSchema'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)

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

  const backToFilter = () => {
    dispatch(postActions.setModalSteps('filters'))
  }

  return {
    backToFilter,
    control,
    errorDescription,
    getProfile,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    modalSteps,
    postDescription,
    postPhotos,
    t,
  }
}
