import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './ChatHead.module.scss'
export const ChatHead = ({ user }: Props) => {
  if (!user?.userName) {
    return null
  }

  return (
    <div className={s.root}>
      <div className={s.avatar}></div>
      <Typography variant={'regular16'}>{user?.userName}</Typography>
    </div>
  )
}

type Props = {
  user?: Pick<Message, 'avatars' | 'userName'>
}
