export type UserResponse = {
  items: {
    avatars: [
      {
        createdAt: string
        fileSize: number
        height: number
        url: string
        width: number
      },
    ]
    createdAt: string
    firstName: string
    id: number
    lastName: string
    userName: string
  }[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type UsersParams = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}

type UserCount = {
  followersCount: number
  followingCount: number
  publicationsCount: number
}

export type UserFollowParams = { username: string } & UsersParams
export type UserFollowResponse = { isFollowedBy: boolean; isFollowing: boolean } & UserResponse
export type UserInfoResponse = UserCount & UserFollowResponse
