import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined

  const { isCloseEditPostModal } = useAppSelector(state => state.postReducer)
  const dispatch = useAppDispatch()

  const handleCloseEditPostDialog = () => {
    dispatch(postActions.setIsCloseEditPostModal(false))
  }

  const handleClosePostDialog = () => {
    void replace({ query: { id: query.id, postId } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsCloseEditPostModal(false))
  }

  return { handleCloseEditPostDialog, handleClosePostDialog, isCloseEditPostModal, t }
}
