import { api } from '@/services/api'
import {
  GetCurrentPaymentSubscriptionResponse,
  SubscriptionsPostParams,
  SubscriptionsPostResponse,
} from '@/services/subscriptionsService/lib/subscriptionsEndpoints.types'

export const subscriptionsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    postSubscriptions: builder.mutation<SubscriptionsPostResponse, SubscriptionsPostParams>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: `subscriptions`,
        }
      },
    }),
    getSubscriptions: builder.query<GetCurrentPaymentSubscriptionResponse, void>({
      providesTags: ['Payment'],
      query: () => {
        return {
          method: 'GET',
          url: `subscriptions/current-payment-subscriptions`,
        }
      },
    }),
  }),
})

export const { usePostSubscriptionsMutation, useGetSubscriptionsQuery } = subscriptionsEndpoints
