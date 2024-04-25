import { api } from '@/services/api'
import {
  EditPostParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
  getUserPostsParams,
  getUserPostsResponse,
} from '@/services/postService/lib/postEndpoints.types'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, number>({
      invalidatesTags: [],
      query: postId => {
        return {
          method: 'DELETE',
          params: {
            postId,
          },
          url: 'posts',
        }
      },
    }),
    editPost: builder.mutation<void, EditPostParams>({
      invalidatesTags: [],
      query: ({ description, postId }) => {
        return {
          body: { description },
          method: 'PUT',
          params: { postId },
          url: `posts/${postId}`,
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
          params: { endCursorPostId, pageSize, userId },
          url: `public-posts/user/${userId}/${endCursorPostId}`,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            postEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: data.ownerId },
              draft => {
                draft.items.unshift(data)
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: body => {
        return {
          body: body,
          method: 'POST',
          url: `posts`,
        }
      },
    }),
    publishPostImage: builder.mutation<PublishPostImageResponse, FormData>({
      query: file => {
        return {
          body: file,
          method: 'POST',
          url: `posts/image`,
        }
      },
    }),
  }),
})

export const {
  useDeletePostMutation,
  useEditPostMutation,
  useGetUserPostsQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints

export const { getUserPosts } = postEndpoints.endpoints
