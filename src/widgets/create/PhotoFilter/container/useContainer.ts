import { useEffect, useRef, useState } from 'react'

import { PhotoFilterTitle } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { Photo, mockPhotoData } from '@/widgets/create/PhotoFilter/mockPhotoData'

export const useContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImage, setCurrentImage] = useState<Photo>(mockPhotoData[0])
  const [currentFilter, setCurrentFilter] = useState<PhotoFilterTitle>('normal')
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null) // Состояние для хранения загруженного изображения
  const [savedImage, setSavedImage] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Загрузка изображения
  useEffect(() => {
    const image = new Image()

    image.crossOrigin = 'anonymous' // Для CORS
    image.onload = () => setLoadedImage(image) // Устанавливаем загруженное изображение в состояние
    image.src = currentImage.url
  }, [currentImage])

  // Отрисовка на канвасе после загрузки изображения и при изменении фильтра/открытия модалки
  useEffect(() => {
    if (canvasRef.current && loadedImage && modalIsOpen) {
      const ctx = canvasRef.current.getContext('2d')!
      const fixedWidth = 500
      const aspectRatio = loadedImage.height / loadedImage.width
      const fixedHeight = fixedWidth * aspectRatio

      canvasRef.current.width = fixedWidth
      canvasRef.current.height = fixedHeight
      ctx.clearRect(0, 0, fixedWidth, fixedHeight)
      ctx.filter = currentFilter || 'none'
      ctx.drawImage(loadedImage, 0, 0, fixedWidth, fixedHeight)
    }
  }, [loadedImage, currentFilter, modalIsOpen])

  const applyFilter = (filter: PhotoFilterTitle) => {
    setCurrentFilter(filter)
  }

  const saveImage = () => {
    if (canvasRef.current) {
      const editedImageUrl = canvasRef.current.toDataURL('image/png')

      setSavedImage(editedImageUrl)
      console.log('Сохраненное изображение URL:', editedImageUrl)
    }
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
