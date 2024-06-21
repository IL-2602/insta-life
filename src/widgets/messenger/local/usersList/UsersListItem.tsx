import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Typography } from '@/shared/ui/Typography'
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

export const UsersListItem = ({ lastUserMsg, onClickOpenChat }: Props) => {
  const { createdAt, messageText, receiverId, userName } = lastUserMsg
  const { locale } = useRouter()

  return (
    <div className={s.root} onClick={() => onClickOpenChat(receiverId)}>
      <div className={s.avatar}></div>
      <div className={s.description}>
        <div className={s.desc_head}>
          <Typography variant={'regular14'}>{userName}</Typography>
          <Typography color={'form'} variant={'small'}>
            {timeConversion(createdAt, locale ?? 'en')}
          </Typography>
        </div>
        <Typography color={'form'} variant={'small'}>
          {messageText}
        </Typography>
      </div>
    </div>
  )
}

type Props = {
  lastUserMsg: Message
  onClickOpenChat: (chatId: number) => void
}
