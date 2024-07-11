import { forwardRef, memo, useState } from 'react'

import { Heart } from '@/shared/assets/icons/Heart'
import { HeartFullIcon } from '@/shared/assets/icons/HeartFull'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { AnswerForm } from '@/widgets/posts/local/AnswerForm/AnswerForm'
import { AnswersList } from '@/widgets/posts/local/AnswersList/publ'
import { CommentProps } from '@/widgets/posts/local/Comment/container'

import s from './Comment.module.css'

export const Comment = forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      avatar,
      comment,
      isAnswer,
      isComment,
      locale,
      onClickSendAnswer,
      onClickSetIsAnswer,
      onClickUpdLikeStatus,
    },
    ref
  ) => {
    let Answers

    if (!comment?.commentId && comment?.answerCount > 0 && comment?.postId) {
      Answers = AnswersList.widget(comment?.postId, comment?.id, comment?.answerCount)
    }

    if (!comment) {
      return null
    }

    return (
      <div className={s.userCommentContainer}>
        <div ref={ref}>
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
              <Button className={s.likeButton} onClick={onClickUpdLikeStatus} variant={'noStyle'}>
                {comment?.isLiked ? <HeartFullIcon /> : <Heart />}
              </Button>
            </div>
          </div>
        </div>
        <div className={s.answers}>
          {isAnswer && (
            <AnswerForm avatar={avatar} isAnswer={!isComment} onAnswer={onClickSendAnswer} />
          )}
          {Answers}
        </div>
      </div>
    )
  }
)
