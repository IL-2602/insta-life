import { api } from '@/services/api'
import {
  EditPostParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
} from '@/services/postService/lib/postEndpoints.types'

const postEndpoints = api.injectEndpoints({
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
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      invalidatesTags: [],
      query: body => {
        return {
          body: body,
          method: 'POST',
          url: `posts`,
        }
      },
    }),
    publishPostImage: builder.mutation<PublishPostImageResponse, FormData>({
      invalidatesTags: [],
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
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints
