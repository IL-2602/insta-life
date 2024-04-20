import { api } from '@/services/api'
import { authSlice } from '@/services/authService/store/slice/authEndpoints.slice'
import { postSlice } from '@/services/postService/store/slice/postEndpoints.slice'
import { profileSlice } from '@/services/profileService/store/slice/profileEndpoints.slice'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(api, authSlice, postSlice, profileSlice)

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  reducer: rootReducer,
})
