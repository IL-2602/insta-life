import { LegacyRef, useEffect, useState } from 'react'

import {
  useCreateAnswerMutation,
  useUpdAnswerLikeStatusMutation,
  useUpdCommentLikeStatusMutation,
} from '@/services/commentsAnswersService/commentsAnswersEndpoints'
import {
  CommentsAnswers,
  LikeStatus,
} from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useRouter } from 'next/router'

export const useContainer = ({
  comment,
  isComment,
}: {
  comment: CommentsAnswers
  isComment: boolean
}) => {
  const { locale, query } = useRouter()
  const postId = (query?.postId as string) || 0
  const { data: profile } = useGetProfileQuery()
  const [isAnswer, setIsAnswer] = useState(false)

  const { commentId, id } = comment
  const avatar = profile?.avatars[0]?.url

  const [createAnswer] = useCreateAnswerMutation()
  const [updCommentLikeStatus] = useUpdCommentLikeStatusMutation()
  const [updAnswerLikeStatus] = useUpdAnswerLikeStatusMutation()
  const onClickSetIsAnswer = () => setIsAnswer(true)
  const onClickSendAnswer = (answer: string) => {
    createAnswer({ commentId: commentId ? commentId : id, content: answer, postId: +postId })
      .unwrap()
      .then(() => setIsAnswer(false))
  }
  const onClickUpdLikeStatus = () => {
    const like = comment.isLiked ? 'NONE' : 'LIKE'

    commentId
      ? updAnswerLikeStatus({
          answerId: comment?.id,
          commentId: commentId,
          likeStatus: like,
          postId: +postId,
        })
      : updCommentLikeStatus({ commentId: id, likeStatus: like, postId: +postId })
  }

  return {
    avatar,
    comment,
    isAnswer,
    isComment,
    locale,
    onClickSendAnswer,
    onClickSetIsAnswer,
    onClickUpdLikeStatus,
  }
}
