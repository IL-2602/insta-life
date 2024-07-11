import React from 'react'
import { useForm } from 'react-hook-form'

import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { TextArea } from '@/shared/ui/TextArea'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './AnswerForm.module.css'
export const AnswerForm = ({ avatar, isAnswer, onAnswer }: Props) => {
  const { myPostSchema } = usePostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })
  const answer = watch('comment')
  const onClickSendAnswer = () => {
    answer?.trim() && onAnswer?.(answer)
  }

  return (
    <div className={clsx(s.answerComment, isAnswer && s.answerAnswer)}>
      <div className={s.avatar}>
        <Avatar userAvatar={avatar} />
      </div>
      <div className={s.textAreaWrapper}>
        <ControlledTextAreaField
          control={control}
          name={'comment'}
          textAreaClassName={s.textArea}
        />
      </div>
      <Button className={s.sendBtn} onClick={onClickSendAnswer} variant={'noStyle'}>
        <Typography color={'primary'} variant={'h3'}>
          Send
        </Typography>
      </Button>
    </div>
  )
}

type Props = {
  avatar?: string
  isAnswer?: boolean
  onAnswer?: (answer: string) => void
}
