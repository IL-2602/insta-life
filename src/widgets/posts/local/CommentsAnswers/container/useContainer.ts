import { useForm } from 'react-hook-form'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
  useUpdCommentLikeStatusMutation,
} from '@/services/commentsAnswersService/commentsAnswersEndpoints'
import { LikeStatus } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { query } = useRouter()
  const postId = (query?.postId as string) || ''

  const { t } = useTranslation()

  const { error: meError } = useGetMeQuery()
  const { myPostSchema } = usePostSchema()
  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })
  const { data: commentsData } = useGetCommentsQuery({ postId: +postId }, { skip: !postId })

  const [createNewComment] = useCreateNewCommentMutation()
  const [updCommentLikeStatus] = useUpdCommentLikeStatusMutation()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
      myPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const comments = commentsData?.items
  const isMe = !meError
  const postDescription = watch('myPostDescription')
  const postComment = watch('comment')

  const commentPublishHandler = () =>
    postId &&
    postComment?.trim() &&
    createNewComment({ content: postComment, postId: +postId })
      .unwrap()
      .then(() => setValue('comment', ''))

  const updateCommentLikeStatusHandler = (commentId: number, likeStatus: LikeStatus) =>
    postId && updCommentLikeStatus({ commentId, likeStatus, postId: +postId })

  return {
    commentPublishHandler,
    comments,
    control,
    isMe,
    postDescription,
    postPhotos,
    t,
    updateCommentLikeStatusHandler,
  }
}
