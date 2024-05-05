import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetMeQuery, useLogOutMutation } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { ROUTES } from '@/shared/constants/routes'
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

  const [logOut] = useLogOutMutation()
  const { data: me } = useGetMeQuery() as { data: UserType }

  const handleLogOut = () => {
    setIsOpen(false)
    logOut()
      .unwrap()
      .then(() => router.push(ROUTES.LOGIN))
      .catch(e => console.log(e))
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
    isOpen,
    me,
    pathname,
    setIsOpen,
    t,
    uploadPostPhoto,
  }
}
