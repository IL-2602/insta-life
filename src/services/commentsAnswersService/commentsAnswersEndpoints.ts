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
    getComments: builder.query<CommentsAnswersResponse<CommentsAnswers>, GetCommentsParams>({
      providesTags: ['Comments'],
      query: ({ postId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `posts/${postId}/comments`,
        }
      },
    }),
    updCommentLikeStatus: builder.mutation<void, UpdateCommentLikeStatusParams>({
      invalidatesTags: ['Comments'],
      onQueryStarted: async (commentLikeArgs, { dispatch, queryFulfilled }) => {
        const { commentId, likeStatus, postId } = commentLikeArgs

        const result = dispatch(
          commentsAnswersEndpoints.util.updateQueryData(
            'getComments',
            { postId: postId },
            draft => {
              const findComment = draft.items.find(c => c.id === commentId)

              if (findComment) {
                findComment.isLiked = likeStatus === 'LIKE'
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          result.undo()
        }
      },

      query: ({ commentId, likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/like-status`,
        }
      },
    }),
  }),
})

export const { useCreateNewCommentMutation, useGetCommentsQuery, useUpdCommentLikeStatusMutation } =
  commentsAnswersEndpoints
