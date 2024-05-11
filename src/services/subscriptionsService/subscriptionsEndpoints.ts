import { api } from '@/services/api'
import {
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
  }),
})

export const { usePostSubscriptionsMutation } = subscriptionsEndpoints
