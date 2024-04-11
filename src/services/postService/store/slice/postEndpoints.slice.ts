import { ModalSteps, PostSliceInitialState } from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  isClosePostModal: false,
  isCreatePostModal: false,
  isDeletePostModal: false,
  isEditPostModal: false,
  modalSteps: undefined,
  postPhotos: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    setClearPostPhotos: state => {
      state.postPhotos = []
    },
    setIsClosePostModal: (state, action: PayloadAction<boolean>) => {
      state.isClosePostModal = action.payload
    },
    setIsCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModal = action.payload
    },
    setIsDeletePostModal: (state, action: PayloadAction<boolean>) => {
      state.isDeletePostModal = action.payload
    },
    setIsEditPostModal: (state, action: PayloadAction<boolean>) => {
      state.isEditPostModal = action.payload
    },
    setModalSteps: (state, action: PayloadAction<ModalSteps>) => {
      state.modalSteps = action.payload
    },
    setPostPhotos: (state, action: PayloadAction<string>) => {
      state.postPhotos.push(action.payload)
    },
  },
})

export const postActions = postSlice.actions
