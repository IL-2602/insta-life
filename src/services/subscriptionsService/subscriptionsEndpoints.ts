import { api } from '@/services/api'
import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'
import {
  GetCurrentPaymentSubscriptionResponse,
  SubscriptionsPostParams,
  SubscriptionsPostResponse,
} from '@/services/subscriptionsService/lib/subscriptionsEndpoints.types'

export const subscriptionsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    canceledAutoRenewal: builder.mutation<ErrorResponse | void, void>({
      invalidatesTags: ['Payment'],
      query: () => {
        return {
          method: 'POST',
          url: `subscriptions/canceled-auto-renewal`,
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
    postSubscriptions: builder.mutation<SubscriptionsPostResponse, SubscriptionsPostParams>({
      invalidatesTags: ['Payment'],
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: `subscriptions`,
        }
      },
    }),
  }),
})

export const {
  useCanceledAutoRenewalMutation,
  useGetSubscriptionsQuery,
  usePostSubscriptionsMutation,
} = subscriptionsEndpoints
