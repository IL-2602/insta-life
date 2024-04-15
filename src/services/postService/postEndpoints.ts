import { api } from '@/services/api'
import { PublishPostParams } from '@/services/postService/lib/postEndpoints.types'
import { EditPostParams } from '@/services/profileService/lib/profileEnpoints.types'

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
          body: { description }, // TODO ???
          method: 'PUT',
          params: { postId }, // TODO ???
          url: `posts/${postId}`,
        }
      },
    }),
    publishPost: builder.mutation<any, PublishPostParams>({
      invalidatesTags: [],
      query: ({ file }) => {
        return {
          body: file,
          method: 'POST',
          url: `posts/image`,
        }
      },
    }),
  }),
})

export const { useDeletePostMutation, useEditPostMutation, usePublishPostMutation } = postEndpoints
