import { AppStore } from '@/app/store/types/appStore'
import { api } from '@/services/api'
import { authSlice } from '@/services/authService/store/slice/authEndpoints.slice'
import { likeSlice } from '@/services/likesService/store/slice/likesEndpoints.slice'
import { messageSlice } from '@/services/messengerService/store/slice/messengerEndpoints.slice'
import { postSlice } from '@/services/postService/store/slice/postEndpoints.slice'
import { profileSlice } from '@/services/profileService/store/slice/profileEndpoints.slice'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'

const rootReducer = combineSlices(api, authSlice, postSlice, profileSlice, messageSlice, likeSlice)

export const makeStore = (context?: Context) =>
  configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: { extraArgument: context } }).concat(api.middleware),
    reducer: rootReducer,
  })

export const wrapper = createWrapper<AppStore>(makeStore)
