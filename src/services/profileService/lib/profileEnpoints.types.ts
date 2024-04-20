import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'

export type UpdateProfileParams = {
  aboutMe?: null | string
  city?: null | string
  dateOfBirth?: any
  firstName?: null | string
  lastName?: null | string
  userName: string
}

export type ProfileSliceInitialState = {
  postId: null | number
  profilePosts: PublishPostResponse[]
}
