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
    removeFirstMessage: state => {
      state.messageData = null
    },
    setFirstMessage: (state, action: PayloadAction<Message>) => {
      state.messageData = action.payload
    },
    updateFirstMessage: (state, action: PayloadAction<Pick<Message, 'messageText' | 'status'>>) => {
      if (state.messageData) {
        state.messageData.messageText = action.payload.messageText
        state.messageData.status = action.payload.status
      }
    },
  },
})

export const messageActions = messageSlice.actions
