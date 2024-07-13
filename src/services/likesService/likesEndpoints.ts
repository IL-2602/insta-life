import { api } from '@/services/api'
import { commentsEndpoints } from '@/services/commentsService/commentsEndpoints'
import { GetLikesResponse } from '@/services/likesService/lib/likesEndpoints.types'
import { publicEndpoints } from '@/services/publicService/publicEndpoints'

export const likesEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getAnswerLikes: builder.query<
      GetLikesResponse,
      { answerId: number; commentId: number; postId: number }
    >({
      query: ({ answerId, commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        }
      },
    }),
    getCommentLikes: builder.query<GetLikesResponse, { commentId: number; postId: number }>({
      query: ({ commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getPostLikes: builder.query<GetLikesResponse, { postId: number }>({
      query: ({ postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/likes`,
        }
      },
    }),
    updateAnswerLike: builder.mutation<
      void,
      {
        answerId: number
        commentId: number
        likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
        postId: number
      }
    >({
      onQueryStarted: async (answerLikeArgs, { dispatch, queryFulfilled }) => {
        const { answerId, commentId, likeStatus, postId } = answerLikeArgs

        const result = dispatch(
          commentsEndpoints.util.updateQueryData('getAnswers', { commentId, postId }, draft => {
            const findAnswer = draft.items.find(a => a.id === answerId)

            if (findAnswer) {
              if (likeStatus === 'DISLIKE') {
                findAnswer.isLiked = false
                findAnswer.likeCount--
              } else {
                findAnswer.isLiked = true
                findAnswer.likeCount++
              }
            }
          })
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
    updateCommentLike: builder.mutation<
      void,
      { commentId: number; likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'; postId: number }
    >({
      onQueryStarted: async (commentLikeArgs, { dispatch, queryFulfilled }) => {
        const { commentId, likeStatus, postId } = commentLikeArgs

        const result = dispatch(
          commentsEndpoints.util.updateQueryData('getComments', { postId: postId }, draft => {
            const findComment = draft.items.find(c => c.id === commentId)

            if (findComment) {
              if (likeStatus === 'DISLIKE') {
                findComment.isLiked = false
                findComment.likeCount--
              } else {
                findComment.isLiked = true
                findComment.likeCount++
              }
            }
          })
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
    updatePostLike: builder.mutation<
      void,
      { likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'; postId: number }
    >({
      invalidatesTags: ['PostLike'],
      onQueryStarted: async (postLikeArgs, { dispatch, queryFulfilled }) => {
        const { likeStatus, postId } = postLikeArgs

        const result = dispatch(
          publicEndpoints.util.updateQueryData('getHomePosts', {}, draft => {
            const findPost = draft.items.find(p => p.id === postId)

            if (findPost) {
              if (likeStatus === 'DISLIKE') {
                findPost.isLiked = false
                findPost.likesCount--
              } else if (likeStatus === 'LIKE') {
                findPost.isLiked = true
                findPost.likesCount++
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          result.undo()
        }
      },
      query: ({ likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `posts/${postId}/like-status`,
        }
      },
    }),
  }),
})

export const {
  useGetPostLikesQuery,
  useLazyGetPostLikesQuery,
  useUpdateAnswerLikeMutation,
  useUpdateCommentLikeMutation,
  useUpdatePostLikeMutation,
} = likesEndpoints
