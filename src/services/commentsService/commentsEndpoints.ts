import { api } from '@/services/api'
import {
  GetAnswersResponse,
  GetCommentsResponse,
  NewAnswerResponse,
  NewCommentResponse,
} from '@/services/commentsService/lib/commentsEndpoints.types'

const commentsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createNewAnswer: builder.mutation<
      NewAnswerResponse,
      { commentId: number; content: string; postId: number }
    >({
      invalidatesTags: ['Answer'],
      query: ({ commentId, content, postId }) => {
        return {
          body: content,
          method: 'POST',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    createNewComment: builder.mutation<NewCommentResponse, { content: string; postId: number }>({
      invalidatesTags: ['Comment'],
      query: ({ content, postId }) => {
        return {
          body: { content },
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    getAnswers: builder.query<GetAnswersResponse, { commentId: number; postId: number }>({
      providesTags: ['Answer'],
      query: ({ commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getComments: builder.query<GetCommentsResponse, { postId: number }>({
      providesTags: ['Comment'],
      query: ({ postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments`,
        }
      },
    }),
  }),
})

export const {
  useCreateNewAnswerMutation,
  useCreateNewCommentMutation,
  useGetAnswersQuery,
  useGetCommentsQuery,
  useLazyGetAnswersQuery,
  useLazyGetCommentsQuery,
} = commentsEndpoints
