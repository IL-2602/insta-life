import {
  Message,
  MessageInitialState,
} from '@/services/messengerService/lib/messengerEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MessageInitialState = {
  messageData: null,
}

export const messageSlice = createSlice({
  initialState,
  name: 'messageReducer',
  reducers: {
    getMessageInfo: (state, action: PayloadAction<Message>) => {
      state.messageData = action.payload
    },
    removeMessageInfo: state => {
      state.messageData = null
    },
  },
})

export const messageActions = messageSlice.actions
