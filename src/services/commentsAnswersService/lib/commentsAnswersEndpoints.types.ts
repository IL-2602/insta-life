export type CommentsAnswersParams = {
  content: string
  postId: number
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type CommentsAnswersResponse = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: Avatar[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type GetCommentsResponse = {
  items: [
    {
      answerCount: number
      content: string
      createdAt: string
      from: {
        avatars: [
          {
            createdAt: string
            fileSize: number
            height: number
            url: string
            width: number
          },
        ]
        id: number
        username: string
      }
      id: number
      isLiked: true
      likeCount: number
      postId: number
    },
  ]
  pageSize: number
  totalCount: number
}
