import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Crop, PixelCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
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
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
  const {
    control,
    formState: { errors },
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })
  const postPhoto = useAppSelector(state => state.postReducer.postPhoto)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)

  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  console.log(completedCrop)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onImageLoaded = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (aspect) {
      const { height, width } = e.currentTarget

      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      // We use canvasPreview as it's much faster than imgPreview.
      const { height, width } = imgRef.current

      setCrop(centerAspectCrop(width, height, 4 / 5))
      canvasPreview(imgRef.current, canvasRef.current, completedCrop)
    }
  }, [completedCrop?.width, completedCrop?.height, imgRef.current, canvasRef.current])

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
    postPhoto,
    setAspect,
    setCompletedCrop,
    setZoom,
  }
}
