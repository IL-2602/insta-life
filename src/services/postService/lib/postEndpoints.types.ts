export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload' | undefined

export type PostSliceInitialState = {
  isCreatePostModal: boolean
  isDeletePostModal: boolean
  isEditPostModal: boolean
  modalSteps: ModalSteps
  postPhotos: string[]
}
