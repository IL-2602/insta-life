import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateNewAnswerMutation,
  useGetAnswersQuery,
  useLazyGetAnswersQuery,
} from '@/services/commentsService/commentsEndpoints'
import { useGetCommentLikesQuery } from '@/services/likesService/likesEndpoints'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'

import s from './Answers.module.scss'

import noAvatar from '../../../../../../public/assets/noPhoto.svg'

export const Answers = ({ answerCount, commentId, postId, postTime }: Props) => {
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

  // const { data: answers } = useGetAnswersQuery({
  //   commentId,
  //   postId,
  // })

  const { data: commentsLikes, isFetching: isGetCommentsLoading } = useGetCommentLikesQuery({
    commentId,
    postId,
  })

  const [getLazyAnswers, { data: answers, isFetching: isGetAnswersLoading }] =
    useLazyGetAnswersQuery()

  const [createNewAnswer, { isLoading: isNewAnswerLoading }] = useCreateNewAnswerMutation()

  const answerPublishHandler = async () => {
    if (answer) {
      await createNewAnswer({ commentId, content: answer, postId })
    }
  }

  // useEffect(() => {
  //   if (!isUninitialized) {
  //     setValue('comment', '')
  //   }
  // }, [isUninitialized, setValue])

  const showAnswers = () => {
    setIsOpenAnswers(!isOpenAnswers)
    getLazyAnswers({ commentId, postId })
  }

  const showAnswerTextField = () => {
    setIsOpenTextField(!isOpenTextField)
  }

  // createAnswer({ commentId, content: 'Answer!!' as string, postId })

  return (
    <div className={s.container}>
      {/*{answers.items.map((answer, id) => {*/}
      {/*  return (*/}

      {/*  )*/}
      {/*})}*/}
      <div className={s.smallContainer}>
        <Typography as={'span'} className={s.time} color={'form'} variant={'small'}>
          <TimeDifference home postTime={postTime} />
        </Typography>
        <Typography as={'span'} className={s.like} color={'form'} variant={'bold-small'}>
          {t.post.like}: {commentsLikes?.totalCount}
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
        <div className={s.addAnswerBlock}>
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
      )}

      <div className={s.answers}>
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
        {isGetAnswersLoading && isOpenAnswers && (
          <Typography as={'span'} className={s.loader}></Typography>
        )}
        {answers && answers.items.length < 1 && isOpenAnswers && !isGetAnswersLoading && (
          <Typography className={s.noAnswers} color={'form'} variant={'small'}>
            {t.post.noAnswers}
          </Typography>
        )}
        <div className={s.answerBlock}>
          <div className={s.noAvatar}>
            <Image alt={'noAvatar'} height={14} src={noAvatar} width={14} />
          </div>
          <Typography className={s.answerName} variant={'bold14'}>
            egor555
          </Typography>
          <Typography as={'span'} className={s.answerComment} variant={'regular14'}>
            Lorem ipsum efbjhdb bwf jwfsvjvfjwv vfgdsv vdv ddv fgeg dgef edgf dfe
          </Typography>
        </div>
      </div>
    </div>
  )
}

type Props = {
  answerCount: number
  commentId: number
  postId: number
  postTime: string
}
