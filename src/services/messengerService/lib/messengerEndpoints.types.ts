import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'

type MessageAvatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
type MessageType = 'TEXT'
export type MessageStatus = 'READ' | 'RECEIVED' | 'SENT'

export type Message = {
  avatars: MessageAvatar[]
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
  userName: string
}

type MessengerResponse = {
  pageSize: number
  totalCount: number
} & ErrorResponse

export type GetMessengerArrayOfLatestMsgResponse = {
  items: Message[]
} & MessengerResponse

export type GetMessengerArrayOfLatestMsgParams = {
  cursor?: number
  pageSize?: number
  searchName?: string
}

export type GetDialogMessagesResponse = {
  items: Omit<Message, 'avatars' | 'userName'>[]
} & MessengerResponse

export type GetDialogMessagesParams = {
  dialogPartnerId: number
} & GetMessengerArrayOfLatestMsgParams

export type InfoMessage = {
  id: null | number
  url: string
  userName: string
}

export type MessageInitialState = {
  messageData: InfoMessage[]
}
