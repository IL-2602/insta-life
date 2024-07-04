import { api } from '@/services/api'
import {
  CommentsAnswers,
  CommentsAnswersResponse,
  CreateCommentParams,
  GetCommentsParams,
} from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

const commentsAnswersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createNewComment: builder.mutation<CommentsAnswers, CreateCommentParams>({
      invalidatesTags: ['Comments'],
      query: ({ postId, ...rest }) => {
        return {
          body: rest || {},
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    getComments: builder.query<CommentsAnswersResponse<CommentsAnswers>, GetCommentsParams>({
      providesTags: ['Comments'],
      query: ({ postId, ...rest }) => {
        return {
          params: rest || {},
          url: `posts/${postId}/comments`,
        }
      },
    }),
  }),
})

export const { useCreateNewCommentMutation, useGetCommentsQuery } = commentsAnswersEndpoints
