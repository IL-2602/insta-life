import { api } from '@/services/api'
import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'

export const devicesEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deleteAllOtherSessions: builder.mutation<void, void>({
      invalidatesTags: ['Sessions'],
      query: () => {
        return {
          method: 'DELETE',
          url: `sessions/terminate-all`,
        }
      },
    }),
    deleteSession: builder.mutation<void, { deviceId: number }>({
      invalidatesTags: ['Sessions'],
      query: ({ deviceId }) => {
        return {
          method: 'DELETE',
          url: `sessions/${deviceId}`,
        }
      },
    }),
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

export const { useDeleteAllOtherSessionsMutation, useDeleteSessionMutation, useGetSessionsQuery } =
  devicesEndpoints
