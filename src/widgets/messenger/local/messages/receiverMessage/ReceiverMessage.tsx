import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './ReceiverMessage.module.scss'
export const ReceiverMessage = ({ message }: Props) => {
  const { messageText } = message

  return (
    <div className={s.root}>
      <div className={s.avatar}></div>
      <div className={s.textWrapper}>
        <Typography variant={'regular14'}>{messageText}</Typography>
        <Typography color={'form'} variant={'small'}>
          14:46
        </Typography>
      </div>
    </div>
  )
}
type Props = {
  message: Omit<Message, 'avatars' | 'userName'>
}
