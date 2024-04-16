import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Crop, PixelCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { canvasPreview } from '@/shared/utils/canvasPrieview'
import { zodResolver } from '@hookform/resolvers/zod'
import { escapeXML } from 'ejs'
import { PostPhoto } from '@/services/postService/lib/postEndpoints.types'
import { action } from '@storybook/addon-actions'
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}
export const useContainer = () => {
  const [zoom, setZoom] = useState(1)
  const [currPhotoIndex, setCurrPhotoIndex] = useState<number | undefined>(0)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const {
    control,
    formState: { errors },
    trigger,
    watch,
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })
  const postPhotos = useAppSelector(state => state.postReducer?.postPhotos)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  const postPhoto = postPhotos.find((_, idx) => idx === currPhotoIndex)
  const dispatch = useAppDispatch()

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const updatePostPhoto = ({ aspect, zoom }: Partial<Pick<PostPhoto, 'aspect' | 'zoom'>>) => {
    if (postPhoto) {
      dispatch(postActions.updatePostPhoto({ img: postPhoto.img, aspect, zoom }))
    }
  }
  const setCurrentPhotoZoom = (zoom: number) => {
    if (postPhoto) {
      saveCropImg({ zoom, img: postPhoto.img })
    }
  }
  const extraActionsPostPhoto = async () => {
    const success = await trigger('postPhoto')
    const file = watch('postPhoto')

    if (file) {
      const badCase = ''
      const img = success ? URL.createObjectURL(file) : badCase

      if (!errors.postPhoto) {
        dispatch(postActions.setPostPhotos(img))
        setCurrPhotoIndex(p => (p || 0) + 1)
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
  const onImageLoaded = () => {
    if (!postPhoto?.aspect) {
      const crop: Crop = {
        height: 100,
        unit: '%',
        width: 100,
        x: 0,
        y: 0,
      }

      setCrop(crop)
      if (imgRef.current) {
        const { height, width } = imgRef.current

        setCompletedCrop(convertToPixelCrop(crop, width, height))
      }
    }
  }
  const onNext = () => dispatch(postActions.setModalSteps('publication'))
  const onPrev = () => dispatch(postActions.setModalSteps('upload'))
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  useLayoutEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      canvasPreview(imgRef.current, canvasRef.current, completedCrop, postPhoto?.zoom)
      saveCropImg({ img: postPhoto?.img })
    }
  }, [crop])

  useLayoutEffect(() => {
    if (imgRef.current) {
      const { height, width } = imgRef.current

      if (postPhoto?.aspect && postPhoto?.aspect !== 0) {
        const newCrop = centerAspectCrop(width, height, postPhoto.aspect)

        console.log('newCrop', imgRef.current)
        setCrop(newCrop)
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      } else {
        const crop: Crop = {
          height: 100,
          unit: '%',
          width: 100,
          x: 0,
          y: 0,
        }

        setCrop(crop)
        if (imgRef.current) {
          const { height, width } = imgRef.current

          setCompletedCrop(convertToPixelCrop(crop, width, height))
        }
      }
    }
  }, [postPhoto?.aspect, postPhoto?.zoom, currPhotoIndex])

  const saveCropImg = ({ img }: Partial<Pick<PostPhoto, 'img' | 'aspect' | 'zoom'>>) => {
    canvasRef?.current?.toBlob(blob => {
      if (blob) {
        const file = URL.createObjectURL(blob)
        dispatch(
          postActions.setCropPostPhotos({
            cropImg: file,
            img,
          })
        )
      }
    }, 'image/jpeg')
  }
  return {
    canvasRef,
    completedCrop,
    control,
    crop,
    currPhotoIndex,
    delPostPhoto,
    extraActionsPostPhoto,
    imgRef,
    modalStep,
    onChangeCurrPhoto,
    onImageLoaded,
    onNext,
    onPrev,
    postPhoto,
    postPhotos,
    setCompletedCrop,
    updatePostPhoto,
    setCurrentPhotoZoom,
    setZoom,
    zoom,
  }
}
