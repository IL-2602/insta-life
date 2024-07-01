import { api } from '@/services/api'
import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'
import {
  UserFollowParams,
  UserFollowResponse,
  UserInfoResponse,
  UserResponse,
  UsersParams,
} from '@/services/usersService/lib/usersEndpoints.types'

export const usersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<UserResponse, UsersParams>({
      query: params => {
        return {
          method: 'GET',
          params: params,
          url: `users`,
        }
      },
    }),
    getUserFollowers: builder.query<Partial<ErrorResponse> & UserFollowResponse, UserFollowParams>({
      query: params => {
        return {
          method: 'GET',
          url: `users/${params.username}/followers`,
        }
      },
    }),
    getUserFollowing: builder.query<UserFollowResponse, UserFollowParams>({
      query: params => {
        return {
          method: 'GET',
          url: `users/${params.username}/following`,
        }
      },
    }),
    getUserInfo: builder.query<UserInfoResponse, { username: string }>({
      query: ({ username }) => {
        return {
          method: 'GET',
          url: `users/${username}`,
        }
      },
    }),
  }),
})

export const {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetUserInfoQuery,
  useGetUserQuery,
} = usersEndpoints
