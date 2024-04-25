export type PublicProfileParams = {
  profileId?: number
}

export type PublicProfileResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
}

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
