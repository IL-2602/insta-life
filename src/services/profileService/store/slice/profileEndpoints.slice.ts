import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { ProfileSliceInitialState } from '@/services/profileService/lib/profileEnpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSliceInitialState = {
  postId: null,
  profilePosts: [],
}

export const profileSlice = createSlice({
  initialState,
  name: 'profileReducer',
  reducers: {
    setPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload
    },
    setProfilePosts: (state, action: PayloadAction<PublishPostResponse[]>) => {
      if (state.profilePosts.length === action.payload.length) {
        state.profilePosts = action.payload
      } else {
        state.profilePosts = state.profilePosts.concat(action.payload)
      }
    },
  },
})

export const profileActions = profileSlice.actions
