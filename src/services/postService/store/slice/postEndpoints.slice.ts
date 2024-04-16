import {
  ModalSteps,
  PostPhoto,
  PostSliceInitialState,
} from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  isClosePostModal: false,
  isCreatePostModal: false,
  isDeletePostModal: false,
  isEditPostModal: false,
  modalSteps: undefined,
  postPhotos: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    delPostPhotos: (state, action: PayloadAction<Pick<PostPhoto, 'img'>>) => {
      state.postPhotos = state.postPhotos.filter((p, idx) => p.img !== action.payload.img)
    },
    setClearPostPhotos: state => {
      state.postPhotos = []
    },
    setCropPostPhotos: (
      state,
      action: PayloadAction<Partial<Pick<PostPhoto, 'aspect' | 'cropImg' | 'img' | 'zoom'>>>
    ) => {
      const tempPhoto = state.postPhotos.find(p => p.img === action.payload.img)
      debugger
      if (tempPhoto) {
        if (action.payload.cropImg) {
          tempPhoto.cropImg = action.payload.cropImg
        }
        if (typeof action.payload.aspect === 'number') {
          tempPhoto.aspect = action.payload.aspect
        }
        if (action.payload.zoom) {
          tempPhoto.zoom = action.payload.zoom
        }
      }
    },
    setIsClosePostModal: (state, action: PayloadAction<boolean>) => {
      state.isClosePostModal = action.payload
    },
    setIsCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModal = action.payload
    },
    setIsDeletePostModal: (state, action: PayloadAction<boolean>) => {
      state.isDeletePostModal = action.payload
    },
    setIsEditPostModal: (state, action: PayloadAction<boolean>) => {
      state.isEditPostModal = action.payload
    },
    setModalSteps: (state, action: PayloadAction<ModalSteps>) => {
      state.modalSteps = action.payload
    },
    setPostPhotos: (state, action: PayloadAction<string>) => {
      const tempPhoto: PostPhoto = {
        aspect: 0,
        cropImg: action.payload,
        img: action.payload,
        zoom: 1,
      }

      state.postPhotos.push(tempPhoto)
    },
    updatePostPhoto: (
      state,
      action: PayloadAction<Partial<Pick<PostPhoto, 'aspect' | 'img' | 'zoom'>>>
    ) => {
      const tempPhoto = state.postPhotos.find((p, idx) => p.img === action.payload.img)

      if (tempPhoto) {
        if (action.payload.aspect) {
          tempPhoto.aspect = action.payload.aspect
        }
        if (action.payload.zoom) {
          tempPhoto.zoom = action.payload.zoom
        }
      }
    },
  },
})

export const postActions = postSlice.actions
