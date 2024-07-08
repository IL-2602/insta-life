import { api } from '@/services/api'
import {
  CommentsAnswers,
  CommentsAnswersResponse,
  CreateCommentParams,
  GetCommentsParams,
  UpdateCommentLikeStatusParams,
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
    getComments: builder.query<
      CommentsAnswersResponse<CommentsAnswers>,
      UpdateCommentLikeStatusParams
    >({
      providesTags: ['Comments'],
      query: ({ commentId, postId, ...rest }) => {
        return {
          params: rest || {},
          type: 'PUT',
          url: `posts/${postId}/comments/${commentId}/like-status`,
        }
      },
    }),
    updCommentLikeStatus: builder.mutation<void, CreateCommentParams>({
      invalidatesTags: ['Comments'],
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

export const { useCreateNewCommentMutation, useGetCommentsQuery, useUpdCommentLikeStatusMutation } =
  commentsAnswersEndpoints
