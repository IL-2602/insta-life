import { api } from '@/services/api'
import {
  GetCurrentPaymentSubscriptionResponse,
  SubscriptionsPostParams,
  SubscriptionsPostResponse,
} from '@/services/subscriptionsService/lib/subscriptionsEndpoints.types'
import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'

export const subscriptionsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getSubscriptions: builder.query<GetCurrentPaymentSubscriptionResponse, void>({
      providesTags: ['Payment'],
      query: () => {
        return {
          method: 'GET',
          url: `subscriptions/current-payment-subscriptions`,
        }
      },
    }),
    postSubscriptions: builder.mutation<SubscriptionsPostResponse, SubscriptionsPostParams>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: `subscriptions`,
        }
      },
    }),
    canceledAutoRenewal: builder.mutation<ErrorResponse | void, void>({
      query: () => {
        return {
          method: 'POST',
          url: `subscriptions/canceled-auto-renewal`,
        }
      },
    }),
  }),
})

export const {
  useGetSubscriptionsQuery,
  useCanceledAutoRenewalMutation,
  usePostSubscriptionsMutation,
} = subscriptionsEndpoints
