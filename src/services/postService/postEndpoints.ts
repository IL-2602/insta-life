import { api } from '@/services/api'
import {
  CreateAnswerCommentParams,
  CreateCommentParams,
  EditPostParams,
  GetCurrentPostResponse,
  GetPostAnswerCommentsParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
  UpdateLikeStatusCommentParams,
} from '@/services/postService/lib/postEndpoints.types'
import { publicEndpoints } from '@/services/publicService/publicEndpoints'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    createAnswerComment: builder.mutation<any, CreateAnswerCommentParams>({
      invalidatesTags: ['Post'],
      query: ({ answerComment, commentId, postId }) => {
        return {
          body: { content: answerComment },
          method: 'POST',
          url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    createComment: builder.mutation<any, CreateCommentParams>({
      invalidatesTags: ['Post'],
      query: ({ comment, postId }) => {
        return {
          body: { content: comment },
          method: 'POST',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    deletePost: builder.mutation<void, { postId: number; profileId: number }>({
      onQueryStarted: async (args, { dispatch }) => {
        try {
          dispatch(
            publicEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: args.profileId },
              draft => {
                const delIdx = draft.items.findIndex(item => item.id === args.postId)

                if (delIdx > -1) {
                  draft.items.splice(delIdx, 1)
                }
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ postId }) => {
        return {
          method: 'DELETE',
          url: `posts/${postId}`,
        }
      },
    }),
    editPost: builder.mutation<void, EditPostParams>({
      invalidatesTags: ['Post'],
      query: ({ description, postId }) => {
        return {
          body: { description },
          method: 'PUT',
          params: { postId },
          url: `posts/${postId}`,
        }
      },
    }),
    getCurrentPost: builder.query<GetCurrentPostResponse, number>({
      providesTags: ['Post'],
      query: postId => {
        return {
          method: 'GET',
          url: `public-posts/${postId}`,
        }
      },
    }),
    getPostAnswersComments: builder.query<any, GetPostAnswerCommentsParams>({
      providesTags: ['Post'],
      query: ({ commentId, postId }) => {
        return {
          method: 'GET',
          params: { commentId, postId },
          url: `posts/${882}/comments/${258}/answers`,
          // url: `posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getPostComments: builder.query<any, number>({
      providesTags: ['Post'],
      query: postId => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments`,
        }
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            publicEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: data.ownerId },
              draft => {
                draft.items.unshift(data)
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: body => {
        return {
          body: body,
          method: 'POST',
          url: `posts`,
        }
      },
    }),
    publishPostImage: builder.mutation<PublishPostImageResponse, FormData>({
      query: file => {
        return {
          body: file,
          method: 'POST',
          url: `posts/image`,
        }
      },
    }),
    updateLikeStatusComment: builder.mutation<void, UpdateLikeStatusCommentParams>({
      invalidatesTags: ['Post'],
      query: ({ commentId, likeStatus, postId }) => {
        return {
          body: { likeStatus: likeStatus },
          method: 'PUT',
          params: { commentId, postId },
          url: `posts/${postId}/comments/${commentId}/like-status`,
        }
      },
    }),
  }),
})

export const {
  useCreateAnswerCommentMutation,
  useCreateCommentMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetCurrentPostQuery,
  useGetPostAnswersCommentsQuery,
  useGetPostCommentsQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
  useUpdateLikeStatusCommentMutation,
} = postEndpoints

export const { getCurrentPost } = postEndpoints.endpoints
