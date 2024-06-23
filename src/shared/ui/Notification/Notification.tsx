import {
  GetNotificationsResponse,
  NotificationItem,
} from '@/services/notificationService/lib/notificationEndpoints.types'
import { Bell } from '@/shared/assets/icons/Bell'
import { NotificationContent } from '@/shared/ui/Notification/NotificationContent/NotificationContent'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { Typography } from '@/shared/ui/Typography'

import s from './Notification.module.scss'

export const Notification = ({ notifications }: Props) => {
  const getNewNotifications = (notifications: NotificationItem[]) => {
    return notifications.filter(notification => !notification.isRead)
  }

  return (
    <button className={s.bellButton}>
      <CustomPopover
        contentChildren={<NotificationContent notifications={notifications} />}
        icon={
          <div style={{ position: 'relative' }}>
            <Bell />
          </div>
        }
      />
      <Typography as={'span'} className={s.span}>
        {getNewNotifications(notifications.items).length}
      </Typography>
    </button>
  )
}
type Props = {
  notifications: GetNotificationsResponse
}
