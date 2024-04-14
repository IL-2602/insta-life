export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload' | undefined

export type PostSliceInitialState = {
  isCreatePostModal: boolean
  isDeletePostModal: boolean
  modalSteps: ModalSteps
  postPhotos: PostPhoto[]
}
export type PostPhoto = {
  aspect: number
  cropImg: string
  img: string
  zoom: number
}
