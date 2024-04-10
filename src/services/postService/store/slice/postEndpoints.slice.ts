import { ModalSteps, PostSliceInitialState } from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  isCreatePostModal: false,
  modalSteps: undefined,
  postPhotos: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    setIsCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModal = action.payload
    },
    setModalSteps: (state, action: PayloadAction<ModalSteps>) => {
      state.modalSteps = action.payload
    },
    setPostPhotos: (state, action: PayloadAction<string>) => {
      state.postPhotos = [...state.postPhotos, action.payload]
    },
  },
})

export const postActions = postSlice.actions
