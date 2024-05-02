import { ReactNode, useEffect, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'

export const TimeDifference = ({ postTime }: { postTime: string }): ReactNode => {
  const { t } = useTranslation()

  const [time, setTime] = useState({ hours: 0, minutes: 0, diffInMinutes: 0 })
  const postDate = new Date(postTime)
  const currentDate = new Date()

  const diffInMilliseconds = currentDate.getTime() - postDate.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60)

  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60

  useEffect(() => {
    if (hours) setTime(p => ({ ...p, hours: hours }))
    if (minutes) setTime(p => ({ ...p, minutes: minutes }))
    if (diffInMinutes) setTime(p => ({ ...p, diffInMinutes: diffInMinutes }))
  }, [])

  if (hours > 0) {
    return (
      <span>
        {time.hours} {t.time.hours} {time.minutes} {t.time.minutes}
      </span>
    )
  } else {
    return (
      <span>
        {time.diffInMinutes} {t.time.minutes}
      </span>
    )
  }
}
