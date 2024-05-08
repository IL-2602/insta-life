import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useDeletePostMutation } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const { isDeletePostModal } = useAppSelector(state => state.postReducer)
  const [deletePost, { isLoading }] = useDeletePostMutation()
  const { query, replace } = useRouter()

  const postId = query?.postId as string | undefined
  const profileId = query?.profileId as string | undefined

  const removePostHandler = async () => {
    deletePost({ postId: Number(postId), profileId: Number(profileId) })
      .unwrap()
      .then(
        (res: any) => {
          dispatch(postActions.setIsDeletePostModal(false))
          dispatch(postActions.setIsMyPostModal(false))
          toast.success('The post has been deleted', {
            pauseOnHover: false,
            style: {
              background: '#0A6638',
              border: '1px solid #14CC70',
              color: 'white',
              fontSize: '14px',
            },
          })
        },
        void replace({ query: { id: query.id } }, undefined, {
          shallow: true,
        })
      )
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
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
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
