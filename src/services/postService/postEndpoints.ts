import { api } from '@/services/api'
import {
  EditPostParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
  getUserPostsParams,
  getUserPostsResponse,
} from '@/services/postService/lib/postEndpoints.types'
import { profileActions } from '@/services/profileService/store/slice/profileEndpoints.slice'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, number>({
      invalidatesTags: [],
      query: postId => {
        return {
          method: 'DELETE',
          params: {
            postId,
          },
          url: 'posts',
        }
      },
    }),
    editPost: builder.mutation<void, EditPostParams>({
      invalidatesTags: [],
      query: ({ description, postId }) => {
        return {
          body: { description },
          method: 'PUT',
          params: { postId },
          url: `posts/${postId}`,
        }
      },
    }),
    getUserPosts: builder.query<getUserPostsResponse, getUserPostsParams>({
      providesTags: ['Post'],
      query: ({ endCursorPostId, pageSize, userId }) => {
        return {
          method: 'GET',
          params: { endCursorPostId, pageSize, userId },
          url: `public-posts/user/${userId}/${endCursorPostId}`,
        }
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled

          dispatch(profileActions.setClearProfilePosts())

          dispatch(
            postEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, pageSize: 12, userId: result.data.ownerId },
              draft => {
                draft.items.splice(-1, 1)
                draft.items.unshift(result.data)

                return draft
              }
            )
          )

          setTimeout(() => {
            dispatch(api.util.invalidateTags(['Post']))
          }, 50)
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

// export const fetchPostsAction = postEndpoints.endpoints.publishPost

export const {
  useDeletePostMutation,
  useEditPostMutation,
  useGetUserPostsQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints
