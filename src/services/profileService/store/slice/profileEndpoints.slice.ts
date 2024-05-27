import { ProfileSliceInitialState } from '@/services/profileService/lib/profileEnpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSliceInitialState = {
  isPrivacyPolicy: false,
}

export const profileSlice = createSlice({
  initialState,
  name: 'profileReducer',
  reducers: {
    setIsPrivacyPolicy: (state, action: PayloadAction<boolean>) => {
      state.isPrivacyPolicy = action.payload
    },
  },
})

export const profileActions = profileSlice.actions
