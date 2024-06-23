import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export type NotificationObjectResponse = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type NotificationItem = {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type GetNotificationsResponse = {
  items: NotificationItem[]
  pageSize: number
  totalCount: number
}

export type GetNotificationsRequest = {
  cursor?: string
  pageSize?: number
  sortDirection?: 'asc' | 'desc'
}
