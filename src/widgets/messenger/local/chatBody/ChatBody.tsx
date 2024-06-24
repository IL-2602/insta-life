import { KeyboardEvent } from 'react'
import { Control } from 'react-hook-form'

import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { MicroIcon } from '@/shared/assets/icons/Micro'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { OwnerMessage } from '@/widgets/messenger/local/messages/ownerMessage/OwnerMessage'
import { ReceiverMessage } from '@/widgets/messenger/local/messages/receiverMessage/ReceiverMessage'

import s from './ChatBody.module.scss'

//** Переключение между типами и кнопка отправить **//
export const ChatBody = ({ control, message, messages, onSendMsg, userId }: Props) => {
  const onEnterHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSendMsg()
    }
  }

  if (!userId || !messages?.length) {
    return (
      <div className={s.noMsg}>
        <Typography variant={'medium14'}>Choose who you would like to talk to</Typography>
      </div>
    )
  }

  return (
    <div className={s.root}>
      <div className={s.body}>
        {messages?.map(msg =>
          msg.ownerId === userId ? (
            <OwnerMessage key={msg.id} message={msg} />
          ) : (
            <ReceiverMessage key={msg.id} message={msg} />
          )
        )}
      </div>
      <div className={s.footer}>
        <ControlledTextAreaField
          control={control}
          name={'message'}
          onKeyDown={onEnterHandler}
          placeholder={'Type Message'}
          textAreaClassName={s.textArea}
        />
        <div className={s.btnWrapper}>
          {message ? (
            <Button className={s.sendBtn} onClick={onSendMsg} variant={'noStyle'}>
              <Typography color={'primary'} variant={'h3'}>
                Send Message
              </Typography>{' '}
            </Button>
          ) : (
            <>
              <Button className={s.icons} variant={'noStyle'}>
                <MicroIcon />
              </Button>
              <Button className={s.icons} variant={'noStyle'}>
                <ImageIcon />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  control: Control<{ message: string }, any>
  message?: string
  messages?: Omit<Message, 'avatars' | 'userName'>[]
  onSendMsg: () => void
  userId?: number
}
