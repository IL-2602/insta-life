import { api } from '@/services/api'
import {
  PublicProfileParams,
  PublicProfileResponse,
} from '@/services/publicProfileSerice/lib/publicProfileEnpoints.types'

const publicProfileEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getPublicUserProfile: builder.query<PublicProfileResponse, PublicProfileParams>({
      query: ({ profileId }) => {
        return {
          method: 'GET',
          url: `public-user/profile/${profileId}`,
        }
      },
    }),
  }),
})

export const { useGetPublicUserProfileQuery } = publicProfileEndpoints
export const { getPublicUserProfile } = publicProfileEndpoints.endpoints
