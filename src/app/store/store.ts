import { AppStore } from '@/app/store/types/appStore'
import { api } from '@/services/api'
import { authSlice } from '@/services/authService/store/slice/authEndpoints.slice'
import { postSlice } from '@/services/postService/store/slice/postEndpoints.slice'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'

const rootReducer = combineSlices(api, authSlice, postSlice)

export const makeStore = (context?: Context) =>
  configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: { extraArgument: context } }).concat(api.middleware),
    reducer: rootReducer,
  })

export const wrapper = createWrapper<AppStore>(makeStore)
