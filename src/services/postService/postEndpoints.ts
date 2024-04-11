import { api } from '@/services/api'
import { EditPostParams } from '@/services/profileService/lib/profileEnpoints.types'

type RequestEditPostParams = {
  description: string
  postId: number
}

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
  }),
})

export const { useDeletePostMutation, useEditPostMutation } = postEndpoints
