import { PostSliceInitialState } from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  modalSteps: ['upload', 'filters', 'cropping', 'publication'],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    setModalSteps: (state, action: PayloadAction<string>) => {
      const newStep = action.payload

      if (state.modalSteps.includes(newStep)) {
        state.modalSteps = state.modalSteps.filter(step => step !== newStep)
      }
    },
  },
})

export const postActions = postSlice.actions
