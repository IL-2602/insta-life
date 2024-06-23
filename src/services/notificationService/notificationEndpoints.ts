import { api } from '@/services/api'
import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import {
  GetNotificationsRequest,
  GetNotificationsResponse,
  NotificationObjectResponse,
} from '@/services/notificationService/lib/notificationEndpoints.types'
import { getCookie } from 'cookies-next'
import { io } from 'socket.io-client'

export const notificationEndpoints = api.injectEndpoints({
  endpoints: build => ({
    getNotification: build.query<GetNotificationsResponse, GetNotificationsRequest>({
      query: ({ cursor = '', pageSize = 12, sortDirection = 'asc' }) => {
        return {
          params: {
            pageSize,
            sortDirection,
          },
          url: `notifications${cursor}`,
        }
      },
    }),
    subscribeToNotifications: build.query<NotificationObjectResponse, void>({
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

          const errorListener = () => {
            console.log('WS Error')
          }
          const notificationListener = (data: NotificationObjectResponse) => {
            console.log(data, 'NOTIFICATION')
            if (data) {
              updateCachedData(draft => {
                Object.assign(draft, data)
              })
            }
          }

          socket.on(WS_EVENT_PATH.ERROR, errorListener) // Исправляем пути событий
          socket.on(WS_EVENT_PATH.NOTIFICATIONS, notificationListener)
        } catch (e) {
          console.error('Error in cacheDataLoaded:', e)
        }

        await cacheEntryRemoved
        socket.off()
        socket.close()
        console.log('WebSocket disconnected')
      },
      queryFn: () => {
        return { data: {} as NotificationObjectResponse } // Возвращаем пустой объект как начальное состояние
      },
    }),
  }),
})

export const { useGetNotificationQuery, useSubscribeToNotificationsQuery } = notificationEndpoints
