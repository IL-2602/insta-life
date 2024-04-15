export type UpdateProfileParams = {
  aboutMe?: null | string
  city?: null | string
  dateOfBirth?: any
  firstName?: null | string
  lastName?: null | string
  userName: string
}

export type EditPostParams = {
  description: string
  postId: number
}
