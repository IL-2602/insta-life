import { api } from '@/services/api'
import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'
import {
  UserFollowParams,
  UserFollowResponse,
  UserInfoResponse,
  UsersParams,
  UsersResponse,
} from '@/services/usersService/lib/usersEndpoints.types'

export const usersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<UsersResponse, UsersParams>({
      query: params => {
        return {
          method: 'GET',
          params: params,
          url: `users`,
        }
      },
    }),
    getUserFollowers: builder.query<Partial<ErrorResponse> & UserFollowResponse, UserFollowParams>({
      providesTags: ['Follow'],
      query: params => {
        return {
          method: 'GET',
          url: `users/${params.username}/followers`,
        }
      },
    }),
    getUserFollowing: builder.query<UserFollowResponse, UserFollowParams>({
      providesTags: ['Follow'],
      query: params => {
        return {
          method: 'GET',
          url: `users/${params.username}/following`,
        }
      },
    }),
    getUserInfo: builder.query<UserInfoResponse, { username: string }>({
      providesTags: ['Follow'],
      query: ({ username }) => {
        return {
          method: 'GET',
          url: `users/${username}`,
        }
      },
    }),
    subscribe: builder.mutation<void, { selectedUserId: number }>({
      invalidatesTags: ['Follow'],
      query: body => {
        return {
          body,
          method: 'POST',
          url: `users/following`,
        }
      },
    }),
    unSubscribe: builder.mutation<void, { userId: number }>({
      invalidatesTags: ['Follow'],
      query: ({ userId }) => {
        return {
          method: 'DELETE',
          url: `users/follower/${userId}`,
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
  useSubscribeMutation,
  useUnSubscribeMutation,
} = usersEndpoints
