import { api } from '@/services/api'
import {
  getUserPostsParams,
  getUserPostsResponse,
} from '@/services/postService/lib/postEndpoints.types'
import {
  allPostsParams,
  getUserProfileResponse,
} from '@/services/publicService/lib/publicEndpoints.types'

export const publicEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getAllPosts: builder.query<getUserPostsResponse, allPostsParams>({
      query: ({ endCursorPostId }) => {
        return {
          method: 'GET',
          params: { endCursorPostId },
          url: `public-posts/all/${endCursorPostId}`,
        }
      },
    }),
    getTotalCount: builder.query<{ totalCount: number }, void>({
      query: () => {
        return {
          method: 'GET',
          url: `public-user`,
        }
      },
    }),
    getUserPosts: builder.query<getUserPostsResponse, getUserPostsParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.endCursorPostId === undefined) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...newItems.items)
        }
      },
      providesTags: ['Post'],
      query: ({ endCursorPostId, pageSize, userId }) => {
        return {
          method: 'GET',
          params: { pageSize, userId },
          url: `public-posts/user/${userId}/${endCursorPostId}`,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    getUserProfile: builder.query<getUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => {
        return {
          method: 'GET',
          params: { profileId },
          url: `public-user/profile/${profileId}`,
        }
      },
    }),
  }),
})

export const { getAllPosts, getTotalCount, getUserPosts } = publicEndpoints.endpoints
export const { useGetAllPostsQuery, useGetTotalCountQuery, useGetUserPostsQuery } = publicEndpoints
