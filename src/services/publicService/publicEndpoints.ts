import { api } from '@/services/api'
import {
  GetHomeResponse,
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
    getHomePosts: builder.query<GetHomeResponse, getUserPostsParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, newItems, otherArgs) => {
        const updatedPosts = newItems.items.slice(1)

        if (otherArgs.arg.endCursorPostId === undefined) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...updatedPosts)
        }
      },
      query: ({ endCursorPostId, pageSize }) => {
        return {
          method: 'GET',
          params: { endCursorPostId, pageSize },
          url: `home/publications-followers`,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
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
  }),
})

export const { getAllPosts, getPublicUserProfile, getTotalCount, getUserPosts } =
  publicEndpoints.endpoints
export const {
  useGetAllPostsQuery,
  useGetHomePostsQuery,
  useGetPublicUserProfileQuery,
  useGetTotalCountQuery,
  useGetUserPostsQuery,
} = publicEndpoints
