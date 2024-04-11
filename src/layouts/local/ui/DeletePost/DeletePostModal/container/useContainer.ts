import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useDeletePostMutation } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useParams } from 'next/navigation'

export const useContainer = () => {
  const { t } = useTranslation()
  const { isDeletePostModal } = useAppSelector(state => state.postReducer)
  const [deletePost, { isLoading }] = useDeletePostMutation()

  //const { postId } = useParams()
  const postId = '1'
  const removePostHandler = async () => {
    deletePost(Number(postId))
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
