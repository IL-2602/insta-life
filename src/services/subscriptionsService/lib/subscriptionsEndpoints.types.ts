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
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type GetCurrentPaymentSubscriptionResponse = {
  data: Payment[]
  hasAutoRenewal: boolean
}
