import { api } from '@/services/api'
import {
  EditPostParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
} from '@/services/postService/lib/postEndpoints.types'
import { publicEndpoints } from '@/services/publicService/publicEndpoints'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, number>({
      invalidatesTags: ['Post'],
      query: postId => {
        return {
          method: 'DELETE',
          url: `posts/${postId}`,
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
    getCurrentPost: builder.query<any, number>({
      query: postId => {
        return {
          method: 'GET',
          url: `public-posts/${postId}`,
        }
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            publicEndpoints.util.updateQueryData(
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
  useGetCurrentPostQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints
