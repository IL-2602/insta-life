import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { PostPhoto } from '@/services/postService/lib/postEndpoints.types'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { canvasPreviewWithOutCrop } from '@/shared/utils/canvasPrieview'
import { zodResolver } from '@hookform/resolvers/zod'

export const useContainer = () => {
  const { t } = useTranslation()

  const [currPhotoIndex, setCurrPhotoIndex] = useState<number | undefined>(0)
  const {
    control,
    formState: { errors },
    setError,
    trigger,
    watch,
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })

  const postPhotoError = errors.postPhoto?.message

  const isCreatePostModal = useAppSelector(state => state.postReducer?.isCreatePostModal)
  const postPhotos = useAppSelector(state => state.postReducer?.postPhotos)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  const postPhoto = postPhotos.find((_, idx) => idx === currPhotoIndex)
  const dispatch = useAppDispatch()

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setCurrentPhotoZoom = (zoom: number) => {
    if (postPhoto) {
      dispatch(postActions.updatePostPhoto({ img: postPhoto.img, zoom }))
    }
  }
  const setCurrentPhotoAspect = (aspect: number) => {
    if (postPhoto) {
      dispatch(postActions.updatePostPhoto({ aspect: aspect, img: postPhoto.img }))
    }
  }

  const extraActionsPostPhoto = async () => {
    if (postPhotos?.length >= 10) {
      setError('postPhoto', { message: 'imgMoreThen10', type: 'custom' })

      return
    }

    const success = await trigger('postPhoto')
    const file = watch('postPhoto')

    if (file) {
      const badCase = ''
      const img = success ? URL.createObjectURL(file) : badCase

      if (!errors.postPhoto && success) {
        dispatch(postActions.setPostPhotos(img))
        setCurrPhotoIndex(typeof currPhotoIndex === 'number' ? currPhotoIndex + 1 : 0)
      }
    }
  }
  const delPostPhoto = (img: string) => {
    dispatch(postActions.delPostPhotos({ img }))
    if (currPhotoIndex && currPhotoIndex - 1 > 0) {
      setCurrPhotoIndex(currPhotoIndex - 1)
    } else {
      setCurrPhotoIndex(undefined)
    }
  }

  const onNext = () => dispatch(postActions.setModalSteps('filters'))
  const onPrev = () => dispatch(postActions.setModalSteps('upload'))
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)
  const saveCropImg = ({ img }: Partial<Pick<PostPhoto, 'aspect' | 'img' | 'zoom'>>) => {
    canvasRef?.current?.toBlob(blob => {
      if (blob) {
        const file = URL.createObjectURL(blob)

        dispatch(
          postActions.setCropPostPhotos({
            cropImg: file,
            img,
          })
        )
        if (img) {
          dispatch(postActions.setFilterPostPhotos({ filterImg: file, img }))
        }
      }
    }, 'image/jpeg')
  }
  const showSaveDraft = () => dispatch(postActions.setIsClosePostModal(true))

  useEffect(() => {
    if (imgRef.current && canvasRef.current) {
      canvasPreviewWithOutCrop(
        imgRef.current,
        canvasRef.current,
        postPhoto?.aspect || 0,
        postPhoto?.zoom
      )
      saveCropImg({ img: postPhoto?.img })
    }
  }, [postPhoto?.zoom, postPhoto?.aspect])

  useEffect(() => {
    if (!isCreatePostModal) {
      setCurrPhotoIndex(0)
    }
  }, [isCreatePostModal])

  return {
    canvasRef,
    control,
    currPhotoIndex,
    delPostPhoto,
    extraActionsPostPhoto,
    imgRef,
    isCreatePostModal,
    modalStep,
    onChangeCurrPhoto,
    onNext,
    onPrev,
    postPhoto,
    postPhotoError,
    postPhotos,
    setCurrentPhotoAspect,
    setCurrentPhotoZoom,
    showSaveDraft,
    t,
  }
}
