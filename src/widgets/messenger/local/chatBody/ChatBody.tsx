import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { MicroIcon } from '@/shared/assets/icons/Micro'
import { Button } from '@/shared/ui/Button'
import { TextArea } from '@/shared/ui/TextArea'
import { Typography } from '@/shared/ui/Typography'
import { OwnerMessage } from '@/widgets/messenger/local/messages/ownerMessage/OwnerMessage'
import { ReceiverMessage } from '@/widgets/messenger/local/messages/receiverMessage/ReceiverMessage'

import s from './ChatBody.module.scss'

//** Переключение между типами и кнопка отправить **//
export const ChatBody = ({ messages, userId }: Props) => {
  if (!userId) {
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
        <TextArea placeholder={'Type Message'} textAreaClassName={s.textArea} />
        <div className={s.btnWrapper}>
          <Button variant={'noStyle'}>
            <MicroIcon />
          </Button>
          <Button variant={'noStyle'}>
            <ImageIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

type Props = {
  messages?: Omit<Message, 'avatars' | 'userName'>[]
  userId?: number
}
