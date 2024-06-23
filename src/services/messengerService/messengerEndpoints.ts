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
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded
          // the /chat-messages endpoint responded already

          const socket = getSocket()

          socket.on(MESSENGER_WS_EVENT.MESSAGE_SENT, (message: Message, cb) => {
            updateCachedData(draft => {
              draft.items = draft?.items?.map(msg =>
                msg.ownerId === message.ownerId && msg.receiverId === message.receiverId
                  ? Object.assign(msg, message)
                  : msg
              )
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
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) {
        try {
          await cacheDataLoaded
          // the /chat-messages endpoint responded already

          const socket = getSocket()

          socket.on(MESSENGER_WS_EVENT.MESSAGE_SENT, (message: Message, cb) => {
            updateCachedData(draft => {
              draft.items?.unshift(message)
              cb({ messageId: message.id, status: 'RECEIVED' })
            })
            // dispatch(
            //   messengerEndpoints.endpoints.updateMessagesStatus.initiate({ ids: [message.id] })
            // )
          })
          socket.on(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, (message: Message) => {
            console.log('RECEIVE_MESSAGE ', message)
            console.log('RECEIVE_MESSAGE Array ', Array.isArray(message))

            if (Array.isArray(message)) {
              updateCachedData(draft => {
                const hasMsg = draft?.items?.find(msg => msg.id === message[0].id)

                console.log('RECEIVE_MESSAGE hasMsg', hasMsg?.id)
                if (hasMsg) {
                  hasMsg.status = message.status
                } else {
                  draft.items.unshift(message)
                }
              })
            } else {
              updateCachedData(draft => {
                const hasMsg = draft?.items?.find(msg => msg.id === message.id)

                console.log('RECEIVE_MESSAGE hasMsg', hasMsg?.id)
                if (hasMsg) {
                  hasMsg.status = message.status
                } else {
                  draft.items.unshift(message)
                }
              })
            }
          })
          await cacheEntryRemoved
          socket.off(MESSENGER_WS_EVENT.MESSAGE_SENT)
          socket.off(MESSENGER_WS_EVENT.RECEIVE_MESSAGE)
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      providesTags: ['Dialogs'],
      query: ({ dialogPartnerId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `messanger/${dialogPartnerId}`,
        }
      },
    }),
    sendMessage: builder.mutation<Message, { message: string; receiverId: number }>({
      queryFn: params => {
        const socket = getSocket()

        return new Promise(resolve => {
          socket.emit(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, params, (message: Message) => {
            resolve({ data: message })
          })
        })
      },
    }),
    updateMessagesStatus: builder.mutation<any, { ids: number[] }>({
      query: params => {
        return {
          body: params,
          method: 'PUT',
          url: 'messanger',
        }
      },
    }),
  }),
})

export const {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery,
  useSendMessageMutation,
  useUpdateMessagesStatusMutation,
} = messengerEndpoints
