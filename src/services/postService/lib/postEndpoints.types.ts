export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload' | undefined

export type PostSliceInitialState = {
  isCreatePostModal: boolean
  modalSteps: ModalSteps
  postPhoto: string
}
