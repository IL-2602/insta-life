import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useEditPostMutation, useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined

  const [editPost, { isLoading: isLoadingEditPost }] = useEditPostMutation()
  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })
  const { isFetching: isGetUserLoading } = useGetProfileQuery()
  const { myPostSchema } = usePostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<myPostFormSchema>({
    defaultValues: {
      myPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const myPostDescription = watch('myPostDescription')
  const { myPostDescription: errorDescription } = errors

  useEffect(() => {
    reset({ myPostDescription: postPhotos?.description })
  }, [reset, postPhotos?.description])

  const updatePost = () => {
    if (myPostDescription !== postPhotos?.description) {
      editPost({ description: myPostDescription, postId: Number(postId) })
        .unwrap()
        .then(() => {
          reset({ myPostDescription })
          void replace({ query: { id: query.id, postId } }, undefined, {
            shallow: true,
          })
          toast.success('The post has been edit', {
            pauseOnHover: false,
            style: {
              background: '#0A6638',
              border: '1px solid #14CC70',
              color: 'white',
              fontSize: '14px',
            },
          })
        })
        .catch(() => {
          toast.error('Error: The post has not been edit ', {
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
  }

  useEffect(() => {
    if (postId) {
      dispatch(postActions.setIsMyPostModal(true))
    }
  }, [dispatch, postId])

  return {
    control,
    errorDescription,
    isGetUserLoading,
    isLoadingEditPost,
    myPostDescription,
    t,
    updatePost,
  }
}
