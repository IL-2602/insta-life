import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PhotoFilterTitle } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'

export const useContainer = () => {
  const { t } = useTranslation()
  const [currPhotoIndex, setCurrPhotoIndex] = useState<number | undefined>(0)
  const isCreatePostModal = useAppSelector(state => state.postReducer?.isCreatePostModal)
  const postPhotos = useAppSelector(state => state.postReducer?.postPhotos)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  const currentImage = postPhotos.find((_, idx) => idx === currPhotoIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [currentFilter, setCurrentFilter] = useState<PhotoFilterTitle>('normal')
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null) // Состояние для хранения загруженного изображения
  const [savedImage, setSavedImage] = useState<string>('')
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
  const modalIsOpen = isCreatePostModal && modalStep === 'filters'
  const dispatch = useAppDispatch()
  const onNext = () => dispatch(postActions.setModalSteps('publication'))
  const onPrev = () => dispatch(postActions.setModalSteps('cropping'))
  const onChangeCurrentImage = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  useLayoutEffect(() => {
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
    image.onload = () => {
      requestAnimationFrame(() => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.filter = currentFilter || 'none'
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      })
    }
    image.src = currentImage.cropImg
  }, [currentImage, currentFilter, modalIsOpen, dispatch])
  const saveImage = () => {
    if (currentImage && canvasRef.current) {
      const editedImageUrl = canvasRef.current.toDataURL('image/png')

      dispatch(
        postActions.setFilterPostPhotos({ filterImg: editedImageUrl, img: currentImage.img })
      )
    }
  }

  const applyFilter = (filter: PhotoFilterTitle) => {
    setCurrentFilter(filter)
  }

  // const saveImage = () => {
  //   if (canvasRef.current) {
  //     const editedImageUrl = canvasRef.current.toDataURL('image/png')
  //
  //     setSavedImage(editedImageUrl)
  //   }
  // }

  return {
    applyFilter,
    currPhotoIndex,
    currentFilter,
    currentImage,
    modalIsOpen,
    onChangeCurrentImage,
    onNext,
    onPrev,
    postPhotos,
    ref: canvasRef,
    saveImage,
    savedImage,
    setCurrentFilter,
    t,
  }
}
