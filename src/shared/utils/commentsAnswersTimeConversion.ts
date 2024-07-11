import { formatDistance } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

export const commentsAnswersTimeConversion = (dateTime: string, locale?: string) => {
  const date = new Date(dateTime)

  const currentLocale = locale === 'ru' ? ru : enUS

  return formatDistance(date, new Date(), { addSuffix: true, locale: currentLocale })
}
