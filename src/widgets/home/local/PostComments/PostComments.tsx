import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
} from '@/services/commentsService/commentsEndpoints'
import { FillSmallHeart, SmallHeart } from '@/shared/assets/icons/SmallHeart'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Image from 'next/image'
import { z } from 'zod'

import s from './PostComments.module.scss'

export const PostComments = ({ postId, postIds, time }: Props) => {
  const { t } = useTranslation()
  const { myPostSchema } = usePostSchema()

  const [isOpenComments, setIsOpenComments] = useState(false)
  const [likedComments, setLikedComments] = useState<number[]>([])

  const commentLike = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId))
    } else {
      setLikedComments([...likedComments, commentId])
    }
  }

  const handleOpenComments = (postId: number) => {
    if (postIds?.some(id => id === postId)) {
      setIsOpenComments(!isOpenComments)
    }
  }

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const [createNewComment, { isLoading: isNewCommentLoading, isUninitialized }] =
    useCreateNewCommentMutation()
  const { data: comments, isFetching: isGetCommentsLoading } = useGetCommentsQuery({ postId })

  const postComment = watch('comment')

  const commentPublishHandler = () =>
    postId &&
    postComment?.trim() &&
    createNewComment({ content: postComment, postId })
      .unwrap()
      .then(() => setValue('comment', ''))

  useEffect(() => {
    if (!isUninitialized) {
      setValue('comment', '')
    }
  }, [isUninitialized, setValue])

  if (!comments) {
    return (
      <div className={s.fetchSpinner}>
        <SpinnerThreePoints />
      </div>
    )
  }

  return (
    <div className={s.container}>
      <Typography
        as={'button'}
        className={s.viewBtn}
        color={'form'}
        onClick={() => handleOpenComments(postId)}
        variant={'bold14'}
      >
        {!isOpenComments ? t.post.viewAllcomments : t.post.hideAllComments} (
        <Typography as={'span'}>{comments?.totalCount}</Typography>)
      </Typography>
      <div className={clsx(s.viewComments, isOpenComments ? s.openComments : '')}>
        {(isNewCommentLoading || isGetCommentsLoading) && isOpenComments && (
          <div className={s.loader}></div>
        )}

        {!comments?.items.length && (
          <Typography className={s.comment} color={'form'} variant={'small'}>
            {t.post.noComments}
          </Typography>
        )}
        {comments?.items.map(comment => {
          return (
            <div className={s.comment} key={comment.id}>
              <div className={s.commentWrap}>
                <Image alt={'avatar'} height={24} src={comment.from.avatars[0].url} width={24} />
                <Typography className={s.commentName} variant={'bold14'}>
                  {comment.from.username}
                </Typography>
                <Typography variant={'regular14'}>{comment.content}</Typography>
              </div>

              <div className={s.smallHeart} onClick={() => commentLike(comment.id)}>
                {likedComments.includes(comment.id) ? <FillSmallHeart /> : <SmallHeart />}
              </div>
            </div>
          )
        })}
      </div>
      <Typography className={s.time}>
        <TimeDifference home postTime={time} />
      </Typography>
      <div className={s.addCommentBlock}>
        <ControlledTextAreaField
          control={control}
          data-id={`postId-${postId}`}
          name={'comment'}
          placeholder={'Add comment...'}
          textAreaClassName={s.textField}
        />
        <Button
          className={s.button}
          disabled={!postComment || isNewCommentLoading}
          onClick={commentPublishHandler}
          variant={'noStyle'}
        >
          <Typography color={'primary'} variant={'h3'}>
            {t.button.publish}
          </Typography>
        </Button>
      </div>
    </div>
  )
}

type Props = { postId: number; postIds: number[] | undefined; time: string }
