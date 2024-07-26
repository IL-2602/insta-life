import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { DraftFromIndDB, postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()

  const { data } = useGetMeQuery() as { data: UserType }
  const id = data.userId

  const [draftFromIndexedDB, setDraftFromIndexedDB] = useState<DraftFromIndDB | undefined>(
    undefined
  )

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
  const openDraft = () => {
    if (draftFromIndexedDB) {
      dispatch(postActions.setPostDescription(draftFromIndexedDB.draft.postDescription))
      dispatch(postActions.setModalSteps(draftFromIndexedDB.draft.modalSteps))
      dispatch(postActions.setPostPhotosFromIndDB(draftFromIndexedDB))
    }
  }

  useEffect(() => {
    const request = window.indexedDB.open('PostDraft', 1)

    request.onupgradeneeded = event => {
      //@ts-ignore
      const db = event.target.result

      db.createObjectStore('myDraftStore', { keyPath: 'id' })
    }

    request.onsuccess = event => {
      //@ts-ignore
      const db = event.target.result
      const transaction = db.transaction(['myDraftStore'], 'readwrite')
      const objectStore = transaction.objectStore('myDraftStore')

      const getRequest = objectStore.get(id)

      getRequest.onsuccess = () => {
        setDraftFromIndexedDB(getRequest.result)
      }
    }
  }, [])

  return {
    control,
    draftFromIndexedDB,
    extraActionsPostPhoto,
    handleCloseModal,
    handleSubmit,
    isCreatePostModal,
    modalSteps,
    openDraft,
    postPhotoError,
    t,
  }
}
