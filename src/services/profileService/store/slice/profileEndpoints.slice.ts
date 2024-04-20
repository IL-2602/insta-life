import { ProfileSliceInitialState } from '@/services/profileService/lib/profileEnpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSliceInitialState = {
  profilePosts: [],
}

export const profileSlice = createSlice({
  initialState,
  name: 'profileReducer',
  reducers: {
    setProfilePosts: (state, action: PayloadAction<string>) => {
      state.profilePosts.push(action.payload)
    },
  },
})

export const profileActions = profileSlice.actions
