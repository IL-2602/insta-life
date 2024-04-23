import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { ProfileSliceInitialState } from '@/services/profileService/lib/profileEnpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSliceInitialState = {
  lastPostId: undefined,
  postId: null,
  profilePosts: [],
}

export const profileSlice = createSlice({
  initialState,
  name: 'profileReducer',
  reducers: {
    setClearProfilePosts: state => {
      state.profilePosts = []
      state.lastPostId = undefined
    },
    setLastPostId: (state, action: PayloadAction<number | undefined>) => {
      state.lastPostId = action.payload
    },
    setPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload
    },
    setProfilePosts: (state, action: PayloadAction<PublishPostResponse[]>) => {
      if (state.profilePosts.length === action.payload.length) {
        state.profilePosts = action.payload
      } else if (state.profilePosts.length > 0) {
        state.profilePosts = state.profilePosts.concat(action.payload)
      } else {
        state.profilePosts = action.payload
      }
    },
  },
})

export const profileActions = profileSlice.actions
