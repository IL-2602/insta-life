import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()
  const { isDeletePostModal } = useAppSelector(state => state.postReducer)

  const dispatch = useAppDispatch()

  const deletePost = () => {
    dispatch(postActions.setIsDeletePostModal(true))
  }

  const handleCloseModal = () => {
    dispatch(postActions.setIsDeletePostModal(false))
  }

  return {
    deletePost,
    handleCloseModal,
    isDeletePostModal,
    t,
  }
}
