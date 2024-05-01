import { getUserPostsParams } from '@/services/postService/lib/postEndpoints.types'

export type allPostsParams = Pick<getUserPostsParams, 'endCursorPostId'>

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type getUserProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}
