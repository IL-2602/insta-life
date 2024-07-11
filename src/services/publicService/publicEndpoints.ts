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
    getPublicUserProfile: builder.query<getUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => {
        return {
          method: 'GET',
          params: { profileId },
          url: `public-user/profile/${profileId}`,
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
      providesTags: ['Post', 'PostLike'],
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
  }),
})

export const { getAllPosts, getPublicUserProfile, getTotalCount, getUserPosts } =
  publicEndpoints.endpoints
export const {
  useGetAllPostsQuery,
  useGetPublicUserProfileQuery,
  useGetTotalCountQuery,
  useGetUserPostsQuery,
} = publicEndpoints
