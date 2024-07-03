import { api } from '@/services/api'
import {
  CommentsAnswersParams,
  CommentsAnswersResponse,
} from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

const commentsAnswersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createNewComment: builder.mutation<CommentsAnswersResponse, CommentsAnswersParams>({
      query: ({ postId, ...rest }) => {
        return {
          body: rest || {},
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
  }),
})

export const { useCreateNewCommentMutation } = commentsAnswersEndpoints
