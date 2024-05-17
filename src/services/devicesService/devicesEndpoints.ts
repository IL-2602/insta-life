import { api } from '@/services/api'
import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'

export const devicesEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query<Session[], void>({
      providesTags: ['Sessions'],
      query: () => {
        return {
          method: 'GET',
          url: `sessions`,
        }
      },
    }),
  }),
})

export const { useGetSessionsQuery } = devicesEndpoints
