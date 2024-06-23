import { GetNotificationsResponse } from '@/services/notificationService/lib/notificationEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './NotificationContent.module.scss'

export const NotificationContent = ({ notifications }: Props) => {
  const customNot = [
    {
      clientId: 'ZGl2NHugowmOgpgNAAjT',
      eventType: 1,
      id: 1824,
      isRead: false,
      message: 'Your subscription has been activated and is valid until 07/05/2024.',
      notifyAt: '2024-06-17T15:21:57.395Z',
    },
    {
      clientId: 'ZGl2NHugowmOgpgNAAjT',
      eventType: 1,
      id: 1825,
      isRead: false,
      message: 'Your subscription has been activated and is valid until 07/05/2024.',
      notifyAt: '2024-06-17T15:21:57.395Z',
    },
  ]

  return (
    <div className={s.content}>
      <div className={!notifications.items.length ? s.mainTitle : ''}>
        <Typography as={'h3'} className={s.title} variant={'medium16'}>
          Уведомления
        </Typography>
      </div>
      {notifications.items.length ? (
        notifications.items.map(n => {
          const notifyAtUtil = (date: string) => {
            return new Date(date).toLocaleDateString()
          }

          return (
            <div className={s.element} key={n.id}>
              <div className={s.newNotificationContainer}>
                <Typography as={'h4'} className={s.title} variant={'medium16'}>
                  Новое уведомление!
                </Typography>
                {!n.isRead && (
                  <Typography className={s.new} variant={'regular14'}>
                    Новое
                  </Typography>
                )}
              </div>
              <Typography>{n.message}</Typography>
              <Typography className={s.notifyAt}>{notifyAtUtil(n.notifyAt)}</Typography>
            </div>
          )
        })
      ) : (
        <Typography as={'h3'} className={s.not} variant={'h1'}>
          Уведомлений нет
        </Typography>
      )}
    </div>
  )
}
type Props = {
  notifications: GetNotificationsResponse
}
