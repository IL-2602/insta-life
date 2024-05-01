import { AuthSliceInitialState } from '@/services/authService/lib/authEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: AuthSliceInitialState = {
  email: '',
  recaptchaToken: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'authReducer',
  reducers: {
    reset: () => initialState,
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setRecaptchaToken: (state, action: PayloadAction<string>) => {
      state.recaptchaToken = action.payload
    },
  },
})

export const authActions = authSlice.actions
