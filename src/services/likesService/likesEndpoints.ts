import { api } from '@/services/api'
import {
  GetLikesResponse,
  UpdateLikeResponse,
} from '@/services/likesService/lib/likesEndpoints.types'

const commentsEndpoints = api.injectEndpoints({
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
      UpdateLikeResponse,
      { answerId: number; commentId: number; postId: number }
    >({
      query: ({ answerId, commentId, postId }) => {
        return {
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        }
      },
    }),
    updateCommentLike: builder.mutation<UpdateLikeResponse, { commentId: number; postId: number }>({
      query: ({ commentId, postId }) => {
        return {
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/like-status`,
        }
      },
    }),
    updatePostLike: builder.mutation<UpdateLikeResponse, { postId: number }>({
      query: ({ postId }) => {
        return {
          method: 'PUT',
          url: `posts/${postId}/like-status`,
        }
      },
    }),
  }),
})

export const {
  useGetAnswerLikesQuery,
  useGetCommentLikesQuery,
  useGetPostLikesQuery,
  useUpdateAnswerLikeMutation,
  useUpdateCommentLikeMutation,
  useUpdatePostLikeMutation,
} = commentsEndpoints
