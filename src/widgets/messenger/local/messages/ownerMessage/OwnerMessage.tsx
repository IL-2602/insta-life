import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './OwnerMessage.module.scss'
export const OwnerMessage = ({ message }: Props) => {
  const { messageText } = message

  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <Typography variant={'regular14'}>{messageText}</Typography>
        <Typography color={'primary'} variant={'small'}>
          14:53
        </Typography>
      </div>
    </div>
  )
}
type Props = {
  message: Omit<Message, 'avatars' | 'userName'>
}
