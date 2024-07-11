import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewAnswerMutation,
  useLazyGetAnswersQuery,
} from '@/services/commentsService/commentsEndpoints'
import { useUpdateAnswerLikeMutation } from '@/services/likesService/likesEndpoints'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { Answer } from '@/widgets/home/local/PostComments/Answer/Answer'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './Answers.module.scss'

export const Answers = ({
  answerCount,
  commentId,
  isOpenComments,
  likeCount,
  postId,
  postTime,
  refetch,
}: Props) => {
  const { t } = useTranslation()

  const { myPostSchema } = usePostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      answer: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const answer = watch('answer')

  const [isOpenAnswers, setIsOpenAnswers] = useState(false)
  const [isOpenTextField, setIsOpenTextField] = useState(false)
  const [isNewAnswerLoading, setIsNewAnswerLoading] = useState(false)

  const [createNewAnswer] = useCreateNewAnswerMutation()
  const [likeAnswer] = useUpdateAnswerLikeMutation()
  const [getLazyAnswers, { data: answers }] = useLazyGetAnswersQuery()

  const answerPublishHandler = async () => {
    setValue('answer', '')

    if (answer) {
      setIsNewAnswerLoading(true)
      try {
        await createNewAnswer({ commentId, content: answer, postId })
        await getLazyAnswers({ commentId, postId })
        await refetch()
      } catch (e) {
        console.error(e)
      } finally {
        setIsNewAnswerLoading(false)
      }
    }

    setIsOpenAnswers(true)
  }

  useEffect(() => {
    ;(async function () {
      if (isOpenComments) {
        await getLazyAnswers({ commentId, postId })
      }
    })()
  }, [isOpenComments, commentId, getLazyAnswers, postId])

  const showAnswers = () => {
    setIsOpenAnswers(!isOpenAnswers)
  }

  const showAnswerTextField = () => {
    setIsOpenTextField(!isOpenTextField)
  }

  const handleDislikeAnswer = async (answerId: number) => {
    await likeAnswer({ answerId, commentId, likeStatus: 'DISLIKE', postId })
    await getLazyAnswers({ commentId, postId })
  }

  const handleLikeAnswer = async (answerId: number) => {
    await likeAnswer({ answerId, commentId, likeStatus: 'LIKE', postId })
    await getLazyAnswers({ commentId, postId })
  }

  return (
    <div className={s.container}>
      <div className={s.smallContainer}>
        <Typography as={'span'} className={s.time} color={'form'} variant={'small'}>
          <TimeDifference home postTime={postTime} />
        </Typography>
        <Typography as={'span'} className={s.like} color={'form'} variant={'bold-small'}>
          {t.post.like}: {likeCount}
        </Typography>
        <Typography
          as={'button'}
          className={s.showTextField}
          color={'form'}
          onClick={showAnswerTextField}
          variant={'bold-small'}
        >
          {t.post.answer}
        </Typography>
      </div>
      {isOpenTextField && (
        <div className={s.answerPublishBlock}>
          <div className={clsx(s.addAnswerBlock, answerCount === 0 ? s.margin : '')}>
            <ControlledTextAreaField
              control={control}
              name={'answer'}
              placeholder={'Add answer...'}
              textAreaClassName={s.textField}
            />
            <Button
              className={s.answerBtn}
              disabled={!answer || isNewAnswerLoading}
              onClick={answerPublishHandler}
              variant={'noStyle'}
            >
              <Typography color={'primary'} variant={'bold14'}>
                {t.button.answer}
              </Typography>
            </Button>
          </div>
          {isNewAnswerLoading && <Typography as={'span'} className={s.loader}></Typography>}
        </div>
      )}

      <div className={s.answers}>
        {answerCount !== 0 && (
          <Typography
            as={'button'}
            className={s.showBtn}
            color={'form'}
            onClick={showAnswers}
            variant={'bold-small'}
          >
            <div className={s.line}></div>
            {isOpenAnswers ? t.post.hideAllAnswers : t.post.showAllAnswers} ({answerCount})
          </Typography>
        )}

        {isOpenAnswers &&
          answers?.items.map((answer, id) => (
            <Answer
              answer={answer}
              handleDislikeAnswer={handleDislikeAnswer}
              handleLikeAnswer={handleLikeAnswer}
              isOpenTextField={isOpenTextField}
              key={id}
            />
          ))}
      </div>
    </div>
  )
}

type Props = {
  answerCount: number
  commentId: number
  isOpenComments: boolean
  likeCount: number
  postId: number
  postTime: string
  refetch: (args?: {} | undefined) => unknown
}
