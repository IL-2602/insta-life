import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useLogOutMutation } from '@/services/authService/authEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { pathname } = router

  const [isOpen, setIsOpen] = useState(false)

  const email = useAppSelector(state => state.authReducer.email)
  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)

  const [logOut, { isLoading }] = useLogOutMutation()

  const handleLogOut = async () => {
    try {
      return await logOut().unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  const uploadPostPhoto = () => {
    dispatch(postActions.setIsCreatePostModal(true))
    dispatch(postActions.setModalSteps('upload'))
  }

  const handleActiveLink = (path: string) => {
    return pathname === path && !isCreatePostModal
  }

  return {
    email,
    handleActiveLink,
    handleLogOut,
    isCreatePostModal,
    isLoading,
    isOpen,
    pathname,
    setIsOpen,
    t,
    uploadPostPhoto,
  }
}
