import { api } from '@/services/api'
import {
  EditPostParams,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
  getUserPostsParams,
  getUserPostsResponse,
} from '@/services/postService/lib/postEndpoints.types'

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
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, newItems, otherArgs) => {
        console.log('otherArgs.arg.endCursorPostId: ', otherArgs.arg.endCursorPostId)
        console.log('currentCache.items: ', currentCache.items)
        console.log('newItems.items: ', newItems.items)

        if (otherArgs.arg.endCursorPostId === undefined) {
          currentCache.items = newItems.items
        } else {
          currentCache.items.push(...newItems.items)
        }

        // if (currentCache.items.length === newItems.items.length) {
        //   console.log('tut if')
        //   currentCache.items = newItems.items
        // }
        // else {
        //   console.log('tut else')
        //   currentCache.items = newItems.items
        // }
        // // else if (currentCache.items.length > 0) {
        // //     currentCache.items.concat(newItems.items)
        // //     console.log('tut else if')
        // //   }
      },
      providesTags: ['Post'],

      query: ({ endCursorPostId, pageSize, userId }) => {
        return {
          method: 'GET',
          params: { endCursorPostId, pageSize, userId },
          url: `public-posts/user/${userId}/${endCursorPostId}`,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      // invalidatesTags: ['Post'],

      onQueryStarted: async ({ lastPostId }, { dispatch, queryFulfilled }) => {
        console.log('lastPostId: ', lastPostId)
        try {
          const { data } = await queryFulfilled

          dispatch(
            postEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: data.ownerId },
              draft => {
                draft.items.unshift(data)
              }
            )
          )

          // dispatch(profileActions.setClearProfilePosts())

          // dispatch(
          //   postEndpoints.util.updateQueryData(
          //     'getUserPosts',
          //     { endCursorPostId: undefined, pageSize: 12, userId: result.data.ownerId },
          //     draft => {
          //       draft.items.splice(-1, 1)
          //       draft.items.unshift(result.data)
          //
          //       return draft
          //     }
          //   )
          // )
          //
          // setTimeout(() => {
          //   dispatch(postEndpoints.util.invalidateTags(['Post']))
          // }, 500)
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
  useGetUserPostsQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints
