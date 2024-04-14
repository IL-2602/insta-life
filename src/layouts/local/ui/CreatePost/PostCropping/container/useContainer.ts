import { useLayoutEffect, useRef, useState } from 'react'
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
  const [currPhoto, setCurrPhoto] = useState<number | undefined>(0)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  console.log('currPhoto', currPhoto)
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
  const postPhoto = postPhotos.find((_, idx) => idx === currPhoto)
  const dispatch = useAppDispatch()

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setCurrentPhotoAspect = (aspect: number) => {
    dispatch(postActions.setPostPhotosAspect({ aspect, img: postPhoto?.img }))
    onDownloadCropClick()
  }

  const extraActionsPostPhoto = async () => {
    const success = await trigger('postPhoto')
    const file = watch('postPhoto')

    if (file) {
      const badCase = ''
      const img = success ? URL.createObjectURL(file) : badCase

      if (!errors.postPhoto) {
        dispatch(postActions.setPostPhotos(img))
        setCurrPhoto(p => (p || 0) + 1)
      }
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
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhoto(currPhoto)

  useLayoutEffect(() => {
    console.log('useEffect Crop')
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      canvasPreview(imgRef.current, canvasRef.current, completedCrop, zoom)
    }
  }, [crop])

  useLayoutEffect(() => {
    console.log('Effect aspect')
    if (imgRef.current) {
      const { height, width } = imgRef.current

      if (postPhoto?.aspect !== 0) {
        const newCrop = centerAspectCrop(width, height, postPhoto?.aspect || 0)

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
  }, [postPhoto?.aspect, zoom, currPhoto])

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = canvasRef.current

    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )
    const ctx = offscreen.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    const file = URL.createObjectURL(blob)

    dispatch(postActions.setCropPostPhotos({ cropImg: file, id: currPhoto }))
  }

  return {
    canvasRef,
    completedCrop,
    control,
    crop,
    currPhoto,
    extraActionsPostPhoto,
    imgRef,
    modalStep,
    onChangeCurrPhoto,
    onImageLoaded,
    onNext,
    postPhoto,
    postPhotos,
    setCompletedCrop,
    setCurrentPhotoAspect,
    setZoom,
    zoom,
  }
}
