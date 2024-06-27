import { RefObject, forwardRef } from 'react'

import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { Avatar } from '@/shared/ui/Avatar'
import { Typography } from '@/shared/ui/Typography'
import { format, isThisWeek, isThisYear, isToday } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './ReceiverMessage.module.scss'

const timeConversion = (dateTime: string, locale: string) => {
  const date = new Date(dateTime)

  const currentLocale = locale === 'ru' ? ru : enUS

  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: currentLocale })
  } else if (isThisWeek(date)) {
    return format(date, 'dd.MM HH:mm', { locale: currentLocale })
  } else if (isThisYear(date)) {
    return format(date, 'd MMMM', { locale: currentLocale })
  } else {
    return format(date, 'dd.MM.yyyy', { locale: currentLocale })
  }
}

export const ReceiverMessage = forwardRef<HTMLDivElement, Props>(
  ({ message, partnerAvatar }, ref) => {
    const { createdAt, id, messageText } = message
    const { locale } = useRouter()

    return (
      <div className={s.root} id={id.toString()} ref={ref}>
        <div className={s.avatar}>
          <Avatar height={32} userAvatar={partnerAvatar} width={32} />
        </div>
        <div className={s.textWrapper}>
          <Typography variant={'regular14'}>{messageText}</Typography>
          <Typography color={'form'} variant={'small'}>
            {timeConversion(createdAt, locale ?? 'en')}
          </Typography>
        </div>
      </div>
    )
  }
)
type Props = {
  message: Omit<Message, 'avatars' | 'userName'>
  partnerAvatar?: string
}
