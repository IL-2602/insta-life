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
export const ChatBody = ({ messages, user }: Props) => {
  if (!user?.receiverId) {
    return (
      <div className={s.noMsg}>
        <Typography variant={'medium14'}>Choose who you would like to talk to</Typography>
      </div>
    )
  }

  return (
    <div className={s.root}>
      <div className={s.body}>
        <ReceiverMessage />
        <OwnerMessage />
        <ReceiverMessage />
        <OwnerMessage />
        <ReceiverMessage />
        <OwnerMessage />
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
  user?: Pick<Message, 'receiverId' | 'userName'>
}
