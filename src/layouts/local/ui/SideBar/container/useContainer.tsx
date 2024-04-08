import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useLogOutMutation } from '@/services/authService/authEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const email = useAppSelector(state => state.authReducer.email)
  const { t } = useTranslation()
  const { pathname } = router

  const { isCreatePostModal } = useAppSelector(state => state.postReducer)
  const dispatch = useAppDispatch()

  const [logOut, { isLoading }] = useLogOutMutation()

  const handleLogOut = async () => {
    try {
      const res = await logOut().unwrap()

      console.log(res)
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
