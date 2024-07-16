import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
} from '@/services/commentsService/commentsEndpoints'
import { useUpdateCommentLikeMutation } from '@/services/likesService/likesEndpoints'
import { FillSmallHeart, SmallHeart } from '@/shared/assets/icons/SmallHeart'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Image from 'next/image'
import { z } from 'zod'

import s from './PostComments.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'
import { Answers } from './Answers/Answers'

export const PostComments = ({ postId, postIds, time }: Props) => {
  const { t } = useTranslation()
  const { myPostSchema } = usePostSchema()

  const [isOpenComments, setIsOpenComments] = useState(false)
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false)

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const postComment = watch('comment')

  const [createNewComment] = useCreateNewCommentMutation()

  const [likeComment] = useUpdateCommentLikeMutation()

  const [getLazyComments] = useLazyGetCommentsQuery()

  const { data: comments, refetch } = useGetCommentsQuery({ postId })
  // totalCount на pageSize в getComments могу получить только из запроса getComments

  const handleLikeComment = async (commentId: number) => {
    await likeComment({ commentId, likeStatus: 'LIKE', postId })
    await getLazyComments({ postId })
  }

  const handleDislikeComment = async (commentId: number) => {
    await likeComment({ commentId, likeStatus: 'DISLIKE', postId })
    await getLazyComments({ postId })
  }

  const handleOpenComments = async (postId: number) => {
    if (postIds?.some(id => id === postId)) {
      setIsOpenComments(!isOpenComments)
    }
  }

  const commentPublishHandler = async () => {
    setValue('comment', '')

    if (postComment) {
      setIsNewCommentLoading(true)
      try {
        await createNewComment({ content: postComment, postId })
        await refetch()
      } catch (err) {
        console.error(err)
      } finally {
        setIsNewCommentLoading(false)
        setIsOpenComments(true)
      }
    }
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
        {!comments?.items.length && (
          <Typography
            className={clsx(s.commentContainer, s.noComment)}
            color={'form'}
            variant={'small'}
          >
            {t.post.noComments}
          </Typography>
        )}
        {comments?.items.map(comment => {
          return (
            <div className={s.commentContainer} key={comment.id}>
              <div className={s.comment}>
                <div className={s.commentWrap}>
                  {comment.from.avatars[0]?.url ? (
                    <Image
                      alt={'avatar'}
                      className={s.avatar}
                      height={24}
                      src={comment.from.avatars[0].url}
                      width={24}
                    />
                  ) : (
                    <div className={s.noAvatar}>
                      <Image alt={'noAvatar'} height={14} src={noAvatar} width={14} />
                    </div>
                  )}

                  <Typography className={s.commentName} variant={'bold14'}>
                    {comment.from.username}
                  </Typography>
                  <Typography variant={'regular14'}>{comment.content}</Typography>
                </div>

                <Typography
                  as={'button'}
                  className={s.smallHeart}
                  onClick={
                    comment.isLiked
                      ? () => handleDislikeComment(comment.id)
                      : () => handleLikeComment(comment.id)
                  }
                >
                  {comment.isLiked ? <FillSmallHeart /> : <SmallHeart />}
                </Typography>
              </div>
              <Answers
                answerCount={comment.answerCount}
                commentId={comment.id}
                isOpenComments={isOpenComments}
                likeCount={comment.likeCount}
                postId={comment.postId}
                postTime={comment.createdAt}
                refetch={refetch}
              />
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
      {isNewCommentLoading && <Typography as={'span'} className={s.loader}></Typography>}
    </div>
  )
}

type Props = {
  postId: number
  postIds: number[] | undefined
  time: string
}
