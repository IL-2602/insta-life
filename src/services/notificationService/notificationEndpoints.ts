import { api } from '@/services/api'
import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import { NotificationResponse } from '@/services/notificationService/lib/notificationEndpoints.types'
import { getCookie } from 'cookies-next'
import { io } from 'socket.io-client'

export const notificationEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    subscribeToNotifications: builder.mutation<NotificationResponse, string>({
      queryFn: () => {
        return new Promise((resolve, reject) => {
          const accessToken = getCookie('accessToken')
          const socket = io('https://inctagram.work', {
            query: {
              accessToken,
            },
          })

          socket.on(WS_EVENT_PATH.NOTIFICATIONS, (data: NotificationResponse) => {
            resolve({ data })
          })

          socket.on(WS_EVENT_PATH.ERROR, (err: Error) => {
            reject({ error: err.message })
          })

          return () => {
            socket.disconnect()
          }
        })
      },
    }),
  }),
})

export const { useSubscribeToNotificationsMutation } = notificationEndpoints
