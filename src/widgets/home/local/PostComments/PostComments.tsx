import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
} from '@/services/commentsService/commentsEndpoints'
import {
  useGetCommentLikesQuery,
  useLazyGetCommentLikesQuery,
  useUpdateCommentLikeMutation,
} from '@/services/likesService/likesEndpoints'
import { FillSmallHeart, SmallHeart } from '@/shared/assets/icons/SmallHeart'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { Answers } from '@/widgets/home/local/PostComments/Answers/Answers'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Image from 'next/image'
import { z } from 'zod'

import s from './PostComments.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostComments = ({ postId, postIds, time }: Props) => {
  const { t } = useTranslation()
  const { myPostSchema } = usePostSchema()

  const [isOpenComments, setIsOpenComments] = useState(false)
  const [likedComments, setLikedComments] = useState<number[]>([])

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
  const [likeComment] = useUpdateCommentLikeMutation()

  const [getLazyCommentsLikes, { data: getCommentsLikes }] = useLazyGetCommentLikesQuery()
  const [getLazyComments, { data: getComments }] = useLazyGetCommentsQuery()
  const { data: comments, isFetching: isGetCommentsLoading } = useGetCommentsQuery({ postId })

  const handleLikeComment = async (commentId: number) => {
    await likeComment({ commentId, likeStatus: 'LIKE', postId })
    getLazyComments({ postId })

    const isLikeComment = comments?.items.find(comment => comment.id === commentId)

    // if (likedComments.includes(commentId)) {
    //   setLikedComments(likedComments.filter(id => id !== commentId))
    //   await likeComment({ commentId, likeStatus: 'LIKE', postId })
    // } else {
    //   setLikedComments([...likedComments, commentId])
    // }
  }

  const handleOpenComments = (postId: number) => {
    if (postIds?.some(id => id === postId)) {
      setIsOpenComments(!isOpenComments)
    }
  }

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
          <Typography
            className={clsx(s.commentContainer, s.noComment)}
            color={'form'}
            variant={'small'}
          >
            {t.post.noComments}
          </Typography>
        )}
        {comments?.items.map(comment => {
          console.log('comment.from: ', comment.from)

          return (
            <div className={s.commentContainer} key={comment.id}>
              <div className={s.comment}>
                <div className={s.commentWrap}>
                  {comment.from.avatars[0]?.url ? (
                    <Image
                      alt={'avatar'}
                      height={24}
                      src={comment.from.avatars[0].url}
                      width={24}
                    />
                  ) : (
                    <div className={s.noAvatar}>
                      <Image alt={'noAvatar'} height={16} src={noAvatar} width={16} />
                    </div>
                  )}

                  <Typography className={s.commentName} variant={'bold14'}>
                    {comment.from.username}
                  </Typography>
                  <Typography variant={'regular14'}>{comment.content}</Typography>
                </div>

                <div className={s.smallHeart} onClick={() => handleLikeComment(comment.id)}>
                  {likedComments.includes(comment.id) ? <FillSmallHeart /> : <SmallHeart />}
                </div>
              </div>
              <Answers
                answerCount={comment.answerCount}
                commentId={comment.id}
                postId={comment.postId}
                postTime={comment.createdAt}
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
    </div>
  )
}

type Props = { postId: number; postIds: number[] | undefined; time: string }
