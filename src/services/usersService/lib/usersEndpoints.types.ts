export type UsersResponse = {
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

export type UserFollowResponse = {
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
    isFollowedBy: boolean
    isFollowing: boolean
    lastName: string
    userId: number
    userName: string
  }[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type UserInfoResponse = {
  aboutMe: string
  avatars: [
    {
      createdAt: string
      fileSize: number
      height: number
      url: string
      width: number
    },
  ]
  city: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  userName: string
}

export type UsersParams = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}

export type UserFollowParams = { username: string } & UsersParams
