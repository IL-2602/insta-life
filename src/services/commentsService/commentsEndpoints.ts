import { api } from '@/services/api'
import {
  CommentsParams,
  GetAnswersResponse,
  GetCommentsResponse,
  NewAnswerResponse,
  NewCommentResponse,
} from '@/services/commentsService/lib/commentsEndpoints.types'

export const commentsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createNewAnswer: builder.mutation<
      NewAnswerResponse,
      { commentId: number; content: string; postId: number }
    >({
      invalidatesTags: ['Comment'],
      query: ({ commentId, content, postId }) => {
        return {
          body: { content },
          method: 'POST',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    createNewComment: builder.mutation<NewCommentResponse, { content: string; postId: number }>({
      query: ({ content, postId }) => {
        return {
          body: { content },
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    getAnswers: builder.query<
      GetAnswersResponse,
      { commentId: number; postId: number } & CommentsParams
    >({
      query: ({ commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getComments: builder.query<GetCommentsResponse, { postId: number } & CommentsParams>({
      query: ({ pageSize, postId }) => {
        return {
          method: 'GET',
          params: { pageSize, postId },
          url: `posts/${postId}/comments`,
        }
      },
    }),
  }),
})

export const {
  useCreateNewAnswerMutation,
  useCreateNewCommentMutation,
  useGetCommentsQuery,
  useLazyGetAnswersQuery,
  useLazyGetCommentsQuery,
} = commentsEndpoints
