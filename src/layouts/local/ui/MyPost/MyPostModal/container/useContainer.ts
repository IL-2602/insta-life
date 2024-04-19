import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useMyPostSchema } from '@/layouts/local/ui/MyPost/MyPostModal/schema/myPostPublicationSchema'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

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

  const commentsTEST = [
    {
      added: '2 Hours ago',
      avatar: '',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      userName: 'URLProfiele',
    },
    {
      added: '3 Hours ago',
      avatar: '',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      userName: 'URLProfiele',
    },
    {
      added: '4 Hours ago',
      avatar: '',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      userName: 'URLProfiele',
    },
  ]

  const openEditPostModal = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const postId = '1'

  // const { postId } = useParams()
  const commentPublish = () => {}

  // const handleCloseModal = () => {
  //   setIsOpenClosePostModal(true)
  // }
  // const closeModalWithRefresh = () => {
  //   dispatch(postActions.setIsMyPostModal(false))
  // }
  // const handleClosePostModal = () => {
  //   setIsOpenClosePostModal(false)
  // }
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
  }
  const editPostModalHandler = () => {
    dispatch(postActions.setIsEditPostModal(true))
  }

  const handleCloseModal = () => {
    setIsOpenClosePostModal(true)
  }
  const closeModalWithRefresh = () => {
    dispatch(postActions.setIsEditPostModal(false))
    setIsOpenClosePostModal(false)
    reset({ myPostDescription: '' })
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
  }

  return {
    closeModalWithRefresh,
    commentPublish,
    commentsTEST,
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
