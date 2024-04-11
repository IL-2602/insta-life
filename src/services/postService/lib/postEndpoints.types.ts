export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload' | undefined

export type PostSliceInitialState = {
  isCreatePostModal: boolean
  isDeletePostModal: boolean
  modalSteps: ModalSteps
  postPhotos: string[]
}
