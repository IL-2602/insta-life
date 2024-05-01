import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'

export const TimeDifference = ({ postTime }: { postTime: string }): ReactNode => {
  const { t } = useTranslation()

  const postDate = new Date(postTime)
  const currentDate = new Date()

  const diffInMilliseconds = currentDate.getTime() - postDate.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60)

  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60

  if (hours > 0) {
    return (
      <span>
        {hours} {t.time.hours} {minutes} {t.time.minutes}
      </span>
    )
  } else {
    return (
      <span>
        {diffInMinutes} {t.time.minutes}
      </span>
    )
  }
}
