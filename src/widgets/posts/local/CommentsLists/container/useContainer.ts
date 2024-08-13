import { useForm } from 'react-hook-form'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
  useUpdCommentLikeStatusMutation,
} from '@/services/commentsAnswersService/commentsAnswersEndpoints'
import { LikeStatus } from '@/services/postService/lib/postEndpoints.types'
import {
  useEditPostLikeStatusMutation,
  useGetCurrentPostQuery,
  useGetLikesPostQuery,
} from '@/services/postService/postEndpoints'
import {
  useSubscribeMutation,
  useUnSubscribeMutation,
} from '@/services/usersService/usersEndpoints'
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
  const { data: postPhotos, isLoading: isLoadingPostPhotos } = useGetCurrentPostQuery(
    Number(postId),
    {
      skip: !postId,
    }
  )
  const { data: commentsData, isLoading: isLoadingComments } = useGetCommentsQuery(
    { pageSize: 15, postId: +postId },
    { skip: !postId }
  )
  const { data: postLikesData } = useGetLikesPostQuery({ postId: postId ?? '' }, { skip: !postId })
  const [createNewComment] = useCreateNewCommentMutation()
  const [updCommentLikeStatus] = useUpdCommentLikeStatusMutation()
  const [editPostLikeStatus] = useEditPostLikeStatusMutation()
  const [follow] = useSubscribeMutation()
  const [unFollow] = useUnSubscribeMutation()

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

  const updatePostLikeStatusHandler = () => {
    console.log()
    editPostLikeStatus({ likeStatus: postLikesData?.isLiked ? 'NONE' : 'LIKE', postId: +postId })
  }

  const isLoadingPost = isLoadingPostPhotos || isLoadingComments

  return {
    commentPublishHandler,
    comments,
    control,
    follow,
    isLoadingComments,
    isLoadingPost,
    isLoadingPostPhotos,
    isMe,
    postDescription,
    postLikesData,
    postPhotos,
    t,
    unFollow,
    updateCommentLikeStatusHandler,
    updatePostLikeStatusHandler,
  }
}
