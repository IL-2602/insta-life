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
