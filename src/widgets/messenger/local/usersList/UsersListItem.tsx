import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { EmailIcon } from '@/shared/assets/icons/Email'
import { MSG_STATUS } from '@/shared/constants/messenger'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import { format, isThisWeek, isThisYear, isToday } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './UsersListItem.module.scss'

//*** Avatar + проверка кто последний отправил сообщение (YouName or userName) + время **//

const timeConversion = (dateTime: string, locale: string) => {
  const date = new Date(dateTime)

  const currentLocale = locale === 'ru' ? ru : enUS

  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: currentLocale })
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE', { locale: currentLocale })
  } else if (isThisYear(date)) {
    return format(date, 'd MMMM', { locale: currentLocale })
  } else {
    return format(date, 'dd.MM.yyyy', { locale: currentLocale })
  }
}

export const UsersListItem = ({ lastUserMsg, onClickOpenChat, userId }: Props) => {
  const { createdAt, messageText, ownerId, receiverId, status, userName } = lastUserMsg
  const { locale } = useRouter()
  const partnerId = userId === ownerId ? receiverId : ownerId

  if (!userId) {
    return null
  }

  return (
    <div className={s.root} onClick={() => onClickOpenChat(partnerId)}>
      <div className={s.avatar}></div>
      <div className={s.description}>
        <div className={s.desc_head}>
          <Typography variant={'regular14'}>{userName}</Typography>
          <Typography color={'form'} variant={'small'}>
            {timeConversion(createdAt, locale ?? 'en')}
          </Typography>
        </div>

        <Typography
          className={clsx(s.text, status !== MSG_STATUS.READ && receiverId !== userId && s.unread)}
          color={'form'}
          variant={'small'}
        >
          {ownerId === userId && 'You: '}
          {messageText}
        </Typography>
      </div>
      {status !== MSG_STATUS.READ && ownerId !== userId && (
        <div className={s.email}>
          <EmailIcon />
        </div>
      )}
    </div>
  )
}

type Props = {
  lastUserMsg: Message
  onClickOpenChat: (chatId: number) => void
  userId?: number
}
