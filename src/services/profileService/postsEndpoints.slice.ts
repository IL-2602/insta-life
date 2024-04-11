import { api } from '@/services/api'

const postsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<any, number>({
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
  }),
})

export const { useDeletePostMutation } = postsEndpoints
