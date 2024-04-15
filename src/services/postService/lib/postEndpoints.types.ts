export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload' | undefined

export type PostSliceInitialState = {
  isCreatePostModal: boolean
  isDeletePostModal: boolean
  isEditPostModal: boolean
  modalSteps: ModalSteps
  postPhotos: PostPhoto[]
}
export type PostPhoto = {
  aspect: number
  cropImg: string
  img: string
  zoom: number
}

export type PublishPostParams = {
  file: string[]
}

export type PublishPhotoResponse = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
