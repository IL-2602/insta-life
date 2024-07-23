export type GetLikesResponse = {
  items: [
    {
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
      id: number
      isFollowedBy: boolean
      isFollowing: boolean
      userId: number
      userName: string
    },
  ]
  pageSize: number
  totalCount: number
}

export type LikeSliceInitialState = {
  isPostLikeLoading: boolean
}
