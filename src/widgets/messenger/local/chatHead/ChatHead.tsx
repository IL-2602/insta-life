import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './ChatHead.module.scss'
export const ChatHead = ({ dialogPartner }: Props) => {
  if (!dialogPartner?.userName) {
    return null
  }

  return (
    <div className={s.root}>
      <div className={s.avatar}></div>
      <Typography variant={'regular16'}>{dialogPartner?.userName}</Typography>
    </div>
  )
}

type Props = {
  dialogPartner?: Pick<Message, 'avatars' | 'userName'>
}
