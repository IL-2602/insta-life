import { forwardRef } from 'react'

import { Message } from '@/services/messengerService/lib/messengerEndpoints.types'
import { CheckIcon } from '@/shared/assets/icons/Check'
import { DoubleCheckIcon } from '@/shared/assets/icons/DoubleCheck'
import { Typography } from '@/shared/ui/Typography'
import { format, isThisWeek, isThisYear, isToday } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import Image from 'next/image'
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

  if (messageText.endsWith('@,@')) {
    const msgArr = messageText.split('@,@')
    const img = msgArr[0]
    const text = msgArr[1]

    return (
      <div className={s.root} id={id.toString()} ref={ref}>
        {msgStatusIcon[status]}
        <div>
          <Image alt={'User picture'} height={360} src={img} width={360} />
          <div className={s.imageAndTextWrapper} style={{ maxWidth: 360 }}>
            <Typography variant={'regular14'}>{text}</Typography>
            <Typography color={'primary'} variant={'small'}>
              {timeConversion(createdAt, locale ?? 'en')}
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  if (
    messageText.startsWith(
      'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/'
    )
  ) {
    return (
      <div className={s.root} id={id.toString()} ref={ref}>
        {msgStatusIcon[status]}
        <div style={{ maxWidth: 360 }}>
          <Image alt={'User picture'} height={360} src={messageText} width={360} />
        </div>
      </div>
    )
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
