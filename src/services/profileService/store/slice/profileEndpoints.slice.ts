import { api } from '@/services/api'
import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { postEndpoints } from '@/services/postService/postEndpoints'
import { ProfileSliceInitialState } from '@/services/profileService/lib/profileEnpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSliceInitialState = {
  lastPostId: undefined,
  postId: null,
  profilePosts: [],
}

export const profileSlice = createSlice({
  // extraReducers: builder => {
  //   builder.addMatcher(postEndpoints.endpoints.publishPost.matchFulfilled, (state, action) => {
  //     state.profilePosts = []
  //     state.lastPostId = undefined
  //   })
  // },
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
      // if (state.profilePosts.length === action.payload.length) {
      //   state.profilePosts = action.payload
      // } else {
      //   state.profilePosts = state.profilePosts.concat(action.payload)
      // }
    },
  },
})

// else if (
//     action.payload.every(item2 => state.profilePosts.some(item1 => item1.id === item2.id))
// ) {
//   console.log('tut')
//
//   state.profilePosts = []
//   state.lastPostId = undefined
// }

export const profileActions = profileSlice.actions
