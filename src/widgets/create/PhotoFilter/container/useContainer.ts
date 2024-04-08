import { useEffect, useRef, useState } from 'react'

import { PhotoFilterTitle } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { Photo, mockPhotoData } from '@/widgets/create/PhotoFilter/mockPhotoData'

export const useContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImage, setCurrentImage] = useState<Photo>(mockPhotoData[0])
  const [currentFilter, setCurrentFilter] = useState<PhotoFilterTitle>('normal')
  const [savedImage, setSavedImage] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (canvasRef.current && currentImage.url && modalIsOpen) {
      const ctx = canvasRef.current.getContext('2d')!
      const image = new Image()

      image.crossOrigin = 'anonymous' // Необходимо для избежания CORS ограничений
      image.onload = () => {
        const fixedWidth = 500
        const aspectRatio = image.height / image.width
        const fixedHeight = fixedWidth * aspectRatio

        canvasRef.current!.width = fixedWidth
        canvasRef.current!.height = fixedHeight
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
        ctx.filter = currentFilter
        ctx.drawImage(image, 0, 0, fixedWidth, fixedHeight)
      }
      image.src = currentImage.url
    }
  }, [currentImage, currentFilter, modalIsOpen])

  const applyFilter = (filter: PhotoFilterTitle) => {
    setCurrentFilter(filter)
  }

  const saveImage = () => {
    if (!canvasRef.current) {
      return
    }
    const editedImageUrl = canvasRef.current.toDataURL('image/png')

    // Здесь можно выполнить дальнейшие действия с editedImageUrl, например, отправить на сервер или сохранить локально
    setSavedImage(editedImageUrl)
    console.log('Сохраненное изображение URL:', editedImageUrl)
  }

  return {
    applyFilter,
    currentFilter,
    currentImage,
    modalIsOpen,
    ref: canvasRef,
    saveImage,
    savedImage,
    setCurrentFilter,
    setCurrentImage,
    setModalIsOpen,
  }
}
