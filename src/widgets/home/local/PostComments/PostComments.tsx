import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewCommentMutation,
  useGetCommentsQuery,
} from '@/services/commentsAnswersService/commentsAnswersEndpoints'
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

export const PostComments = ({ postId }: Props) => {
  const { t } = useTranslation()
  const { myPostSchema } = usePostSchema()

  const [isOpenComments, setIsOpenComments] = useState(false)

  const handleOpenComments = () => {
    setIsOpenComments(!isOpenComments)
  }

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const [createNewComment, { isLoading: isNewCommentLoading }] = useCreateNewCommentMutation()
  const { data: comments } = useGetCommentsQuery({ postId })

  const postComment = watch('comment')

  const commentPublishHandler = () =>
    postId &&
    postComment?.trim() &&
    createNewComment({ content: postComment, postId })
      .unwrap()
      .then(() => setValue('comment', ''))

  return (
    <div className={s.container}>
      <Typography
        as={'button'}
        className={s.viewBtn}
        color={'form'}
        onClick={handleOpenComments}
        variant={'bold14'}
      >
        {!isOpenComments ? t.post.viewAllcomments : t.post.hideAllComments} (
        <Typography as={'span'}>{comments?.totalCount}</Typography>)
      </Typography>
      <div className={clsx(s.viewComments, isOpenComments ? s.openComments : '')}>
        {comments?.items.map(comment => {
          return (
            <div className={s.comment} key={comment.id}>
              <Image alt={'avatar'} height={24} src={comment.from.avatars[0].url} width={24} />
              <Typography className={s.commentName} variant={'bold14'}>
                {comment.from.username}
              </Typography>
              <Typography variant={'regular14'}>{comment.content}</Typography>
            </div>
          )
        })}
      </div>
      <div className={s.addCommentBlock}>
        <ControlledTextAreaField
          control={control}
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

type Props = { postId: number }
