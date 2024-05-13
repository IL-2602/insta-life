import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'

export type SubscriptionsPostParams = {
  amount: number
  baseUrl: string
  paymentType: 'PAYPAL' | 'STRIPE'
  typeSubscription: 'DAY' | 'MONTHLY' | 'WEEKLY'
} & Partial<ErrorResponse>

export type SubscriptionsPostResponse = {
  url: string
}
export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type GetCurrentPaymentSubscriptionResponse = {
  data: Payment[]
  hasAutoRenewal: boolean
}
