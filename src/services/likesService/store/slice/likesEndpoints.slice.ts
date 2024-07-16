import { LikeSliceInitialState } from '@/services/likesService/lib/likesEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: LikeSliceInitialState = {
  isPostLikeLoading: false,
}

export const likeSlice = createSlice({
  initialState,
  name: 'likeReducer',
  reducers: {
    setIsPostLikeLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostLikeLoading = action.payload
    },
  },
})

export const likesActions = likeSlice.actions
