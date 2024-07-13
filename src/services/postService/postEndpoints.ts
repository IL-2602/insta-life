import { api } from '@/services/api'
import {
  EditPostParams,
  GetCurrentPostResponse,
  PostLikesRequest,
  PostLikesResponse,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
} from '@/services/postService/lib/postEndpoints.types'
import { publicEndpoints } from '@/services/publicService/publicEndpoints'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
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
    getLikesPost: builder.query<PostLikesResponse, PostLikesRequest>({
      query: params => {
        const { postId, ...rest } = params

        return {
          method: 'GET',
          params: rest,
          url: `posts/${postId}/likes`,
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
  }),
})

export const {
  useDeletePostMutation,
  useEditPostMutation,
  useGetCurrentPostQuery,
  useGetLikesPostQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints

export const { getCurrentPost } = postEndpoints.endpoints
