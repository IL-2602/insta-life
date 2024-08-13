import { api } from '@/services/api'
import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import {
  ChangeNotificationsRequest,
  ChangeNotificationsResponse,
  GetNotificationsRequest,
  GetNotificationsResponse,
  NotificationObjectResponse,
} from '@/services/notificationService/lib/notificationEndpoints.types'
import { QuerySubState } from '@reduxjs/toolkit/query'
import { getCookie } from 'cookies-next'
import { io } from 'socket.io-client'

export const notificationEndpoints = api.injectEndpoints({
  endpoints: build => ({
    changeNotification: build.mutation<ChangeNotificationsResponse, ChangeNotificationsRequest>({
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          api.util.updateQueryData(
            // @ts-ignore
            'getNotification',
            arg,
            (draft: GetNotificationsResponse) => {
              draft.items.forEach(el => {
                if (el.id === arg.ids[0]) {
                  el.isRead = true
                }
              })
            }
          )
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: `notifications/mark-as-read`,
      }),
    }),
    getNotification: build.query<GetNotificationsResponse, GetNotificationsRequest>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg
      },
      merge: (currentCacheData, newItems, otherArgs) => {
        const updatedNotification = newItems.items

        if (
          newItems.items.length > 0 &&
          newItems.items[newItems.items.length - 1].id !==
            currentCacheData.items[currentCacheData.items.length - 1].id
        ) {
          console.log('push notification')

          currentCacheData.items.push(...updatedNotification)
        }
      },
      providesTags: ['Notification'],
      query: ({ cursor = '', pageSize = 12, sortDirection = 'desc' }) => {
        return {
          params: {
            pageSize,
            sortDirection,
          },
          url: `notifications/${cursor}`,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    subscribeToNotifications: build.query<NotificationObjectResponse, void>({
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const accessToken = getCookie('accessToken')

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

export const {
  useChangeNotificationMutation,
  useGetNotificationQuery,
  useSubscribeToNotificationsQuery,
} = notificationEndpoints
