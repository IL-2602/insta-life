export type PublicProfileParams = {
  profileId?: number
}

export type PublicProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
