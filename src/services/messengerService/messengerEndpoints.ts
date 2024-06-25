import { api } from '@/services/api'
import { MESSENGER_WS_EVENT } from '@/services/messengerService/lib/constant'
import {
  GetDialogMessagesParams,
  GetDialogMessagesResponse,
  GetMessengerArrayOfLatestMsgParams,
  GetMessengerArrayOfLatestMsgResponse,
  Message,
} from '@/services/messengerService/lib/messengerEndpoints.types'
import { deleteCookie, getCookie } from 'cookies-next'
import { has } from 'immutable'
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
              cb({ messageId: message.id, status: 'READ' })
            })
            dispatch(api.util?.invalidateTags(['LastMessages']))
          })
          socket.on(MESSENGER_WS_EVENT.RECEIVE_MESSAGE, (message: Message) => {
            if (Array.isArray(message)) {
              updateCachedData(draft => {
                draft.items = draft?.items?.map(draftMsg => {
                  const hasMsg = message.find(msg => msg.id === draftMsg.id)

                  return hasMsg ? { ...draftMsg, status: hasMsg.status } : draftMsg
                })
              })
            } else {
              updateCachedData(draft => {
                const hasMsg = draft?.items?.find(msg => msg.id === message.id)

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled

          if (result?.data) {
            const unreadMsgs =
              result.data.items?.reduce((acc, curr) => {
                if (curr.status !== 'READ') {
                  acc.push(curr.id)
                }

                return acc
              }, [] as number[]) || []

            if (unreadMsgs?.length) {
              dispatch(
                messengerEndpoints.endpoints.updateMessagesStatus.initiate({ ids: unreadMsgs })
              )
            }
          }
          // setTimeout(() => {
          //   dispatch(api.util.invalidateTags(['Me']))
          // }, 50)
        } catch (e) {
          console.log(e)
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
      transformResponse: (response: GetDialogMessagesResponse, _meta, _arg) => {
        response.items?.sort((a, b) => a.id - b.id)

        return response
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
      invalidatesTags: ['LastMessages'],
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
