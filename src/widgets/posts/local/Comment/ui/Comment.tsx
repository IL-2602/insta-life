import { useState } from 'react'

import { Heart } from '@/shared/assets/icons/Heart'
import { HeartFullIcon } from '@/shared/assets/icons/HeartFull'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { Answer } from '@/widgets/posts/local/Answer/Answer'
import { AnswersList } from '@/widgets/posts/local/AnswersList/publ'
import { CommentProps } from '@/widgets/posts/local/Comment/container'
import { useRouter } from 'next/router'

import s from './Comment.module.css'

export const Comment = ({
  comment,
  isAnswer,
  isComment,
  locale,
  onClickSetIsAnswer,
}: CommentProps) => {
  const Answers =
    (comment?.id &&
      comment?.postId &&
      comment?.answerCount &&
      AnswersList.widget(comment?.postId, comment?.id, comment?.answerCount)) ||
    null

  if (!comment) {
    return null
  }

  return (
    <div className={s.userCommentContainer}>
      <div>
        <div className={s.userPhotoWrapper}>
          <div className={s.photo}>
            <Avatar userAvatar={comment?.from?.avatars[0]?.url} />
          </div>
          <div className={s.commentText}>
            <Typography as={'b'} variant={'bold14'}>
              {comment?.from.username}
              <Typography variant={'regular14'}>{comment?.content}</Typography>
            </Typography>
            <div className={s.commentsInfo}>
              <Typography className={'commentTime'} color={'form'} variant={'small'}>
                {commentsAnswersTimeConversion(comment?.createdAt, locale)}
              </Typography>
              <Typography className={'commentTime'} color={'form'} variant={'bold-small'}>
                Like: {comment.likeCount}
              </Typography>
              <Button className={s.answer} onClick={onClickSetIsAnswer} variant={'noStyle'}>
                <Typography className={'commentTime'} variant={'bold-small'}>
                  Answer
                </Typography>
              </Button>
            </div>
          </div>
          <div className={s.commentLike}>
            <Button className={s.likeButton} variant={'noStyle'}>
              {comment?.isLiked ? <HeartFullIcon /> : <Heart />}
            </Button>
          </div>
        </div>
      </div>
      <div className={s.answers}>
        {isAnswer && <Answer isAnswer={!isComment} />}
        {Answers}
      </div>
    </div>
  )
}
