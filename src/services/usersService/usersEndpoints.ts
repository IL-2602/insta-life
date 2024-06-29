import { api } from '@/services/api'
import { UserParams, UserResponse } from '@/services/usersService/lib/usersEndpoints.types'

export const usersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UserResponse, UserParams>({
      query: params => {
        return {
          method: 'GET',
          params: params,
          url: `users`,
        }
      },
    }),
  }),
})

export const { useGetUsersQuery } = usersEndpoints
