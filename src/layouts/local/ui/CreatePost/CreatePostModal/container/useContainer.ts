import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'

export const useContainer = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    trigger,
    watch,
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })

  const postPhotoError = errors.postPhoto?.message

  const extraActionsPostPhoto = async () => {
    const success = await trigger('postPhoto')
    const file = watch('postPhoto')

    if (file) {
      const badCase = ''
      const img = success ? URL.createObjectURL(file) : badCase

      if (!errors.postPhoto) {
        dispatch(postActions.setPostPhotos(img))
        dispatch(postActions.setModalSteps('cropping'))
      }
    }
  }

  const handleCloseModal = () => {
    dispatch(postActions.setIsCreatePostModal(false))
    resetField('postPhoto')
    clearErrors()
  }

  return {
    control,
    extraActionsPostPhoto,
    handleCloseModal,
    handleSubmit,
    isCreatePostModal,
    modalSteps,
    postPhotoError,
    t,
  }
}
