import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export type NotificationResponse = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type SubscribeToNotificationsResult = {
  data: NotificationResponse
  error?: FetchBaseQueryError
  meta?: {}
}
