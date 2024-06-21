import { api } from '@/services/api'
import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import { NotificationResponse } from '@/services/notificationService/lib/notificationEndpoints.types'
import { getCookie } from 'cookies-next'
import { io } from 'socket.io-client'

export const notificationEndpoints = api.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query<NotificationResponse[], void>({
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const accessToken = getCookie('accessToken')

        console.log('Access Token:', accessToken) // Логируем токен для проверки

        const socket = io('https://inctagram.work', {
          query: { accessToken },
          transports: ['websocket'], // Убедитесь, что используются правильные транспорты
        })

        socket.on('connect', () => {
          console.log('WebSocket connected')
        })

        socket.on('connect_error', err => {
          console.error('WebSocket connection error:', err)
        })

        try {
          await cacheDataLoaded

          const errorListener = () => console.log('WS Error')
          const notificationListener = (data: NotificationResponse) => {
            console.log(data, 'NOTIFICATION')
            if (data) {
              updateCachedData(draft => {
                draft.push(data)
              })
            }
          }

          socket.on(WS_EVENT_PATH.ERROR, errorListener) // Исправляем пути событий
          socket.on(WS_EVENT_PATH.NOTIFICATIONS, notificationListener)
        } catch (e) {
          console.error('Error in cacheDataLoaded:', e)
        }

        await cacheEntryRemoved
        socket.disconnect()
        console.log('WebSocket disconnected')
      },
      queryFn: () => ({ data: [] }), // начальное значение
    }),
  }),
})

export const { useGetNotificationsQuery } = notificationEndpoints
