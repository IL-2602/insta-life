import React from 'react'

import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { TextArea } from '@/shared/ui/TextArea'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'

import s from './Answer.module.css'
export const Answer = ({ isAnswer, onAnswer }: Props) => {
  return (
    <div className={clsx(s.answerComment, isAnswer && s.answerAnswer)}>
      <div className={s.avatar}>
        <Avatar />
      </div>
      <div className={s.textAreaWrapper}>
        <TextArea textAreaClassName={s.textArea} />
      </div>
      <Button onClick={onAnswer} variant={'noStyle'}>
        <Typography color={'primary'} variant={'h3'}>
          Send
        </Typography>
      </Button>
    </div>
  )
}

type Props = {
  isAnswer?: boolean
  onAnswer?: () => void
}
