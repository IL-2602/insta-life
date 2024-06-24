import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { CheckIcon } from '@/shared/assets/icons/Check'
import { DoubleCheckIcon } from '@/shared/assets/icons/DoubleCheck'
import { Typography } from '@/shared/ui/Typography'

import s from './OwnerMessage.module.scss'
export const OwnerMessage = ({ message }: Props) => {
  const { messageText, status } = message

  const msgStatusIcon = {
    READ: <DoubleCheckIcon className={s.read} />,
    RECEIVED: <DoubleCheckIcon className={s.unread} />,
    SENT: <CheckIcon className={s.unread} />,
  }

  return (
    <div className={s.root}>
      {msgStatusIcon[status]}
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
