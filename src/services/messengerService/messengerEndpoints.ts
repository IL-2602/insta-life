import { api } from '@/services/api'
import { MESSENGER_WS_EVENT } from '@/services/messengerService/lib/constant'
import {
  GetDialogMessagesParams,
  GetDialogMessagesResponse,
  GetMessengerArrayOfLatestMsgParams,
  GetMessengerArrayOfLatestMsgResponse,
  Message,
} from '@/services/messengerService/lib/messengerEndpoints.types'
import { getCookie } from 'cookies-next'
import { markAssetError } from 'next/dist/client/route-loader'
import { Socket, io } from 'socket.io-client'

const queryParams = {
  query: {
    accessToken: getCookie('accessToken'),
  },
}

let socket: Socket

function getSocket() {
  if (!socket) {
    socket = io('https://inctagram.work', queryParams)
  }

  return socket
}

export const messengerEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getArrayOfLastMsg: builder.query<
      GetMessengerArrayOfLatestMsgResponse,
      GetMessengerArrayOfLatestMsgParams
    >({
      async onCacheEntryAdded(photoId, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded
          // the /chat-messages endpoint responded already

          const socket = getSocket()

          socket.on(MESSENGER_WS_EVENT.MESSAGE_SENT, (message: Message, cb) => {
            updateCachedData(draft => {
              const currMsgIdx = draft?.items?.findIndex(msg => msg.id === message.id)

              if (currMsgIdx) {
                draft?.items.splice(currMsgIdx, 1, message)
              }
              cb({ messageId: message.id, status: 'RECEIVED' })
            })
          })

          await cacheEntryRemoved
          socket.off(MESSENGER_WS_EVENT.MESSAGE_SENT)
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      providesTags: ['LastMessages'],
      query: params => {
        return {
          method: 'GET',
          params: params || {},
          url: `messanger`,
        }
      },
    }),
    getDialogMessages: builder.query<GetDialogMessagesResponse, GetDialogMessagesParams>({
      providesTags: ['Dialogs'],
      query: ({ dialogPartnerId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `messanger/${dialogPartnerId}`,
        }
      },
    }),
    sendMessage: builder.mutation<any, { message: string; receiverId: number }>({
      queryFn: params => {
        const socket = getSocket()

        return new Promise(resolve => {
          socket.emit(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, params, (message: Message) => {
            resolve({ data: message })
          })
        })
      },
    }),
  }),
})

export const { useGetArrayOfLastMsgQuery, useGetDialogMessagesQuery, useSendMessageMutation } =
  messengerEndpoints
