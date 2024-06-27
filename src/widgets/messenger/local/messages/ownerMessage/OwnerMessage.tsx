import { forwardRef } from 'react'

import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { CheckIcon } from '@/shared/assets/icons/Check'
import { DoubleCheckIcon } from '@/shared/assets/icons/DoubleCheck'
import { Typography } from '@/shared/ui/Typography'
import { format, isThisWeek, isThisYear, isToday } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './OwnerMessage.module.scss'

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

export const OwnerMessage = forwardRef<HTMLDivElement, Props>(({ message }, ref) => {
  const { locale } = useRouter()
  const { createdAt, id, messageText, status } = message

  const msgStatusIcon = {
    READ: <DoubleCheckIcon className={s.read} />,
    RECEIVED: <DoubleCheckIcon className={s.unread} />,
    SENT: <CheckIcon className={s.unread} />,
  }

  return (
    <div className={s.root} id={id.toString()} ref={ref}>
      {msgStatusIcon[status]}
      <div className={s.textWrapper}>
        <Typography variant={'regular14'}>{messageText}</Typography>
        <Typography color={'primary'} variant={'small'}>
          {timeConversion(createdAt, locale ?? 'en')}
        </Typography>
      </div>
    </div>
  )
})

type Props = {
  message: Omit<Message, 'avatars' | 'userName'>
}
