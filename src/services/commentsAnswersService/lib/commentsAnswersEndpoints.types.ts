type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type CommentsAnswers = {
  answerCount: number
  commentId?: number
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
  postId?: number
}

export type CommentsAnswersResponse<T = {}> = {
  items: T[]
  page?: number
  pageSize?: number
  pagesCount?: number
  totalCount: number
}
export type CreateCommentParams = {
  content: string
  postId: number
}
export type CreateAnswerParams = {
  commentId: number
  content: string
  postId: number
}

export type UpdateCommentLikeStatusParams = {
  commentId: number
  likeStatus: LikeStatus
  postId: number
}
export type UpdateAnswerLikeStatusParams = {
  answerId: number
} & UpdateCommentLikeStatusParams

export type GetCommentsParams = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetAnswerParams = { commentId: number } & GetCommentsParams
