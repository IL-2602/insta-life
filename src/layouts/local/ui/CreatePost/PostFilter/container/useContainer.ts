import { useEffect, useRef, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { PhotoFilterTitle } from '@/layouts/local/ui/CreatePost/PostFilter/FilterPreviewButton/FilterPreviewButtonData'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()
  const [currPhotoIndex, setCurrPhotoIndex] = useState<number | undefined>(0)
  const isCreatePostModal = useAppSelector(state => state.postReducer?.isCreatePostModal)
  const postPhotos = useAppSelector(state => state.postReducer?.postPhotos)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  const currentImage = postPhotos.find((_, idx) => idx === currPhotoIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [currentFilter, setCurrentFilter] = useState<PhotoFilterTitle>('normal')
  const [imageURL, setImageURL] = useState('')
  const modalIsOpen = isCreatePostModal && modalStep === 'filters'
  const dispatch = useAppDispatch()
  const onNext = () => dispatch(postActions.setModalSteps('publication'))
  const onPrev = () => dispatch(postActions.setModalSteps('cropping'))
  const onChangeCurrentImage = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  useEffect(() => {
    if (!currentImage || !canvasRef.current || !modalIsOpen) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('Не удалось получить контекст канваса')

      return
    }

    const image = new Image()

    image.crossOrigin = 'anonymous'
    image.src = currentImage.cropImg
    image.onload = () => {
      requestAnimationFrame(() => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.filter = currentFilter || 'none'
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        // Сохранение изображения в стейт
        canvas.toBlob(blob => {
          if (blob) {
            const url = URL.createObjectURL(blob)

            setImageURL(url)
          }
          // Сохраняем URL в стейт
        }, 'image/png')
      })
    }
  }, [currentFilter])

  useEffect(() => {
    if (currentImage) {
      dispatch(postActions.setFilterPostPhotos({ filterImg: imageURL, img: currentImage.img }))
    }
  }, [imageURL])

  const applyFilter = (filter: PhotoFilterTitle) => {
    setCurrentFilter(filter)
  }

  return {
    applyFilter,
    currPhotoIndex,
    currentFilter,
    currentImage,
    imageURL,
    modalIsOpen,
    onChangeCurrentImage,
    onNext,
    onPrev,
    postPhotos,
    ref: canvasRef,
    setCurrentFilter,
    t,
  }
}
