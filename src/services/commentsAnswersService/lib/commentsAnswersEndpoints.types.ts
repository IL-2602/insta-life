type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type CommentsAnswers = {
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

export type CommentsAnswersResponse<T = {}> = {
  items: T[]
  pageSize: number
  totalItems: number
}
export type CreateCommentParams = {
  content: string
  postId: number
}

export type UpdateCommentLikeStatusParams = {
  commentId: number
  likeStatus: LikeStatus
  postId: number
}

export type GetCommentsParams = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
