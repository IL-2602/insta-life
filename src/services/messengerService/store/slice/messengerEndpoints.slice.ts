import {
  InfoMessage,
  MessageInitialState,
} from '@/services/messengerService/lib/messengerEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

const initialState: MessageInitialState = {
  messageData: [
    {
      id: null,
      url: '' || noAvatar,
      userName: '',
    },
  ],
}

export const messageSlice = createSlice({
  initialState,
  name: 'messageReducer',
  reducers: {
    getMessageInfo: (state, action: PayloadAction<InfoMessage>) => {
      state.messageData.push(action.payload)
    },
  },
})

export const messageActions = messageSlice.actions
