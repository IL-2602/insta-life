import { api } from '@/services/api'
import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'
import { Avatar, Profile } from '@/shared/types/profile'
import { MyPayment } from '@/shared/types/profile/profile'

import { UpdateProfileParams } from './lib/profileEnpoints.types'

const profileEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ['Profile'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          profileEndpoints.util.updateQueryData('getProfile', undefined, draft => {
            //Optimistic Update delete Avatar
            const imgs = draft.avatars

            if (imgs.length > 0) {
              imgs.length = 0
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          result.undo()
        }
      },
      query: () => {
        return {
          method: 'DELETE',
          url: 'users/profile/avatar',
        }
      },
    }),
    getMyPayments: builder.query<MyPayment[], void>({
      query: _ => `subscriptions/my-payments`,
    }),
    getProfile: builder.query<Profile, void>({
      providesTags: ['Profile'],
      query: _ => `users/profile`,
    }),
    updateProfile: builder.mutation<ErrorResponse, UpdateProfileParams>({
      invalidatesTags: ['Profile'],
      query: args => {
        return {
          body: args,
          method: 'PUT',
          url: 'users/profile',
        }
      },
    }),
    uploadAvatar: builder.mutation<Avatar[], { file: FormData }>({
      invalidatesTags: ['Profile'],
      onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          profileEndpoints.util.updateQueryData('getProfile', undefined, draft => {
            //Optimistic Update main Avatar
            const imgs = draft.avatars
            const ava = file.get('file') as File

            if (imgs.length > 0) {
              if (ava) {
                const fileBlob = new Blob([ava], { type: ava.type })

                imgs[0].url = URL.createObjectURL(fileBlob)
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
      query: ({ file }) => {
        return {
          FormData,
          body: file,
          method: 'POST',
          url: 'users/profile/avatar',
        }
      },
    }),
  }),
})

export const {
  useDeleteAvatarMutation,
  useGetMyPaymentsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileEndpoints
