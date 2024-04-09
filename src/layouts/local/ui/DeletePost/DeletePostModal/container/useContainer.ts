import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useDeletePostMutation } from '@/services/profileService/postsEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()
  const { isDeletePostModal } = useAppSelector(state => state.postReducer)
  const [deletePost, { isLoading }] = useDeletePostMutation()

  const removePostHandler = async (postId: number) => {
    deletePost(postId)
      .unwrap()
      .then((res: any) => {
        dispatch(postActions.setIsDeletePostModal(false))
        toast.success('The post has been deleted', {
          pauseOnHover: false,
          style: {
            background: '#0A6638',
            border: '1px solid #14CC70',
            color: 'white',
            fontSize: '14px',
          },
        })
      })
      .catch((err: any) => {
        toast.error('Error: The post has not been deleted ', {
          pauseOnHover: false,
          style: {
            background: '#660A1D',
            border: '1px solid #CC1439',
            color: 'white',
            fontSize: '14px',
          },
        })
      })
  }

  const dispatch = useAppDispatch()

  const openDeletePostModal = () => {
    dispatch(postActions.setIsDeletePostModal(true))
  }

  const handleCloseModal = () => {
    dispatch(postActions.setIsDeletePostModal(false))
  }

  return {
    handleCloseModal,
    isDeletePostModal,
    isLoading,
    openDeletePostModal,
    removePostHandler,
    t,
  }
}
