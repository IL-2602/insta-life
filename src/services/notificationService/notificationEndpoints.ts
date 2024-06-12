import { api } from '@/services/api'
import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import { NotificationResponse } from '@/services/notificationService/lib/notificationEndpoints.types'
import { getCookie } from 'cookies-next'
import { io } from 'socket.io-client'

export const notificationEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    subscribeToNotifications: builder.mutation<NotificationResponse, void>({
      queryFn: async () => {
        const accessToken = getCookie('accessToken')

        return new Promise<{ data: NotificationResponse }>((resolve, reject) => {
          const socket = io('https://inctagram.work', {
            query: {
              accessToken,
            },
          })

          const handleNotification = (data: NotificationResponse) => {
            resolve({ data })
          }

          const handleError = (err: Error) => {
            reject({ error: err.message })
          }

          socket.on(WS_EVENT_PATH.NOTIFICATIONS, handleNotification)
          socket.on(WS_EVENT_PATH.ERROR, handleError)

          // Возвращаем функцию для отключения WebSocket соединения
          return () => {
            socket.off(WS_EVENT_PATH.NOTIFICATIONS, handleNotification)
            socket.off(WS_EVENT_PATH.ERROR, handleError)
            socket.disconnect()
          }
        })
      },
    }),
  }),
})

export const { useSubscribeToNotificationsMutation } = notificationEndpoints
