import { SyntheticEvent, useEffect, useRef, useState } from 'react'
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
  const [aspect, setAspect] = useState<number>(0)
  const [currPhoto, setCurrPhoto] = useState<number | undefined>(undefined)
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })
  const postPhotos = useAppSelector(state => state.postReducer?.postPhotos)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  const dispatch = useAppDispatch()
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const extraActionsPostPhoto = async () => {
    const success = await trigger('postPhoto')
    const file = watch('postPhoto')

    if (file) {
      const badCase = ''
      const img = success ? URL.createObjectURL(file) : badCase

      if (!errors.postPhoto) {
        dispatch(postActions.setPostPhotos(img))
      }
    }
  }

  const onImageLoaded = () => {
    if (!aspect) {
      const crop: Crop = {
        height: 100,
        unit: '%',
        width: 100,
        x: 0,
        y: 0,
      }

      setCrop(crop)
    }
  }
  const onNext = () => dispatch(postActions.setModalSteps('publication'))
  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhoto(currPhoto)
  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      const { height, width } = imgRef.current

      if (aspect !== 0) {
        setCrop(centerAspectCrop(width, height, aspect))
      } else {
        onImageLoaded()
      }
      if (crop) {
        setCompletedCrop(convertToPixelCrop(crop, width, height))
        canvasPreview(imgRef.current, canvasRef.current, completedCrop, zoom)
      }
    }
  }, [completedCrop, crop, imgRef.current, canvasRef.current, aspect, zoom])

  const blobUrlRef = useRef('')
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)

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

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }
  }

  return {
    aspect,
    canvasRef,
    completedCrop,
    control,
    crop,
    hiddenAnchorRef,
    imgRef,
    modalStep,
    onDownloadCropClick,
    onImageLoaded,
    onNext,
    postPhotos,
    setAspect,
    setCompletedCrop,
    setZoom,
    zoom,
    extraActionsPostPhoto,
    currPhoto,
    onChangeCurrPhoto,
  }
}
