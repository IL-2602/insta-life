import { useCallback, useRef, useState } from 'react'
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

  const [page, setPage] = useState<number>(1)

  const { error: meError } = useGetMeQuery()
  const { myPostSchema } = usePostSchema()
  const { data: postPhotos, isLoading: isLoadingPostPhotos } = useGetCurrentPostQuery(
    Number(postId),
    {
      skip: !postId,
    }
  )
  const {
    data: commentsData,
    isFetching: isFetchingComments,
    isLoading: isLoadingComments,
  } = useGetCommentsQuery({ pageNumber: page, pageSize: 15, postId: +postId }, { skip: !postId })
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
  const commentsTotalCount = commentsData?.totalCount
  const commentsPageCount = commentsData?.pagesCount || 1
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
    editPostLikeStatus({ likeStatus: postLikesData?.isLiked ? 'NONE' : 'LIKE', postId: +postId })
  }

  const isLoadingPost = isLoadingPostPhotos || isLoadingComments

  const cursorRef = useRef<IntersectionObserver | null>(null)
  const lastElRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingComments || isLoadingComments) {
        return
      }
      if (cursorRef.current) {
        cursorRef.current.disconnect()
      }
      cursorRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < commentsPageCount) {
          setPage(p => p + 1)
        }
      })

      if (node) {
        cursorRef.current.observe(node)
      }
    },
    [isFetchingComments, page, isLoadingComments]
  )

  return {
    commentPublishHandler,
    comments,
    commentsTotalCount,
    control,
    follow,
    isFetchingComments,
    isLoadingComments,
    isLoadingPost,
    isLoadingPostPhotos,
    isMe,
    lastElRef,
    postDescription,
    postLikesData,
    postPhotos,
    t,
    unFollow,
    updateCommentLikeStatusHandler,
    updatePostLikeStatusHandler,
  }
}
