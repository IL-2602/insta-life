import { api } from '@/services/api'
import {
  CommentsAnswers,
  CommentsAnswersResponse,
  CreateAnswerParams,
  CreateCommentParams,
  GetAnswerParams,
  GetCommentsParams,
  UpdateAnswerLikeStatusParams,
  UpdateCommentLikeStatusParams,
} from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

const commentsAnswersEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createAnswer: builder.mutation<CommentsAnswers, CreateAnswerParams>({
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled

          if (res.data) {
            dispatch(
              commentsAnswersEndpoints.util.updateQueryData(
                'getAnswers',
                { commentId: args.commentId, postId: args.postId },
                draft => {
                  draft.items.unshift(res.data)
                  draft.totalCount = draft.totalCount + 1
                }
              )
            )
            dispatch(
              commentsAnswersEndpoints.util.updateQueryData(
                'getComments',
                { pageSize: 15, postId: args.postId },
                draft => {
                  const findComment = draft.items.find(comment => comment.id === res.data.commentId)

                  if (findComment) {
                    findComment.answerCount = findComment.answerCount + 1
                  }
                }
              )
            )
          }
        } catch (e) {
          console.log(e)
        }
      },

      query: ({ commentId, postId, ...rest }) => {
        return {
          body: rest || {},
          method: 'POST',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    createNewComment: builder.mutation<CommentsAnswers, CreateCommentParams>({
      invalidatesTags: ['Comments', 'Answers'],
      query: ({ postId, ...rest }) => {
        return {
          body: rest || {},
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    getAnswers: builder.query<CommentsAnswersResponse<CommentsAnswers>, GetAnswerParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.pageNumber !== previousArg?.pageNumber
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.pageNumber === 1) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...newItems.items)
        }
      },
      providesTags: ['Answers'],
      query: ({ commentId, postId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}?${queryArgs.commentId}`
      },
    }),
    getComments: builder.query<CommentsAnswersResponse<CommentsAnswers>, GetCommentsParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.pageNumber !== previousArg?.pageNumber
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.pageNumber === 1) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...newItems.items)
        }
      },
      providesTags: ['Comments'],
      query: ({ postId, ...rest }) => {
        return {
          method: 'GET',
          params: rest || {},
          url: `posts/${postId}/comments`,
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}?${queryArgs.postId}`
      },
    }),
    updAnswerLikeStatus: builder.mutation<void, UpdateAnswerLikeStatusParams>({
      onQueryStarted: async (answerLikeStatus, { dispatch, queryFulfilled }) => {
        const { answerId, commentId, likeStatus, postId } = answerLikeStatus

        const result = dispatch(
          commentsAnswersEndpoints.util.updateQueryData(
            'getAnswers',
            { commentId: commentId, postId: postId },
            draft => {
              const findComment = draft.items.find(a => a.id === answerId)

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

      query: ({ answerId, commentId, likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
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

export const {
  useCreateAnswerMutation,
  useCreateNewCommentMutation,
  useGetAnswersQuery,
  useGetCommentsQuery,
  useUpdAnswerLikeStatusMutation,
  useUpdCommentLikeStatusMutation,
} = commentsAnswersEndpoints
