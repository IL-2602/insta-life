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

export type UserParams = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
