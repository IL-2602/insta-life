import React, { forwardRef, useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { FilterPreviewButton } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButton'
import {
  PhotoFilterTitle,
  photoFilters,
} from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { PhotoFilterProps } from '@/widgets/create/PhotoFilter/container'
import { Photo, mockPhotoData } from '@/widgets/create/PhotoFilter/mockPhotoData'
import { capitalizeFirstLetter } from '@/widgets/create/PhotoFilter/utils/capitalizeFirstLetter'

export const PhotoFilter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImage, setCurrentImage] = useState<Photo>(mockPhotoData[0])
  const [currentFilter, setCurrentFilter] = useState<PhotoFilterTitle>('normal')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const image = new Image()

    image.crossOrigin = 'anonymous' // Для CORS
    image.onload = () => {
      if (canvasRef.current && modalIsOpen) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          console.error('Не удалось получить контекст канваса')

          return
        }

        // Предполагаем, что родительский элемент канваса имеет заданные CSS-размеры.
        const canvasWidth = canvas.offsetWidth // Ширина родителя
        const canvasHeight = canvas.offsetHeight // Высота родителя

        // Применяем размеры канваса
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        // Рассчитываем новые пропорции для масштабирования изображения
        const imgAspectRatio = image.width / image.height
        const canvasAspectRatio = canvasWidth / canvasHeight
        let drawWidth, drawHeight

        if (imgAspectRatio > canvasAspectRatio) {
          // Изображение шире канваса
          drawHeight = canvasHeight
          drawWidth = canvasHeight * imgAspectRatio
        } else {
          // Изображение выше канваса
          drawWidth = canvasWidth
          drawHeight = canvasWidth / imgAspectRatio
        }

        // Рассчитываем смещение для центрирования изображения
        const xOffset = (canvasWidth - drawWidth) / 2
        const yOffset = (canvasHeight - drawHeight) / 2

        // Очищаем канвас
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.filter = currentFilter || 'none'

        // Отрисовываем изображение с учетом смещения
        ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight)
      }
    }
    image.src = currentImage.url
  }, [currentImage, currentFilter, modalIsOpen])

  const applyFilter = (filter: PhotoFilterTitle) => {
    setCurrentFilter(filter)
  }

  const saveImage = () => {
    if (canvasRef.current) {
      const editedImageUrl = canvasRef.current.toDataURL('image/png')

      console.log('Сохраненное изображение URL:', editedImageUrl)
    }
  }

  const openModalHandle = () => {
    setModalIsOpen(true)
    applyFilter('normal') // Это может быть необходимо переместить в useEffect, если 'normal' вызывает перерисовку
  }

  return (
    <>
      <Button onClick={openModalHandle}>Open</Button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '1200px',
        }}
      >
        <div style={{ width: '50%' }}>
          <canvas ref={canvasRef} />
        </div>
        <div>
          {photoFilters.map(filter => (
            <FilterPreviewButton
              applyFilter={applyFilter}
              filter={filter}
              imageUrl={currentImage.url}
              key={filter}
              label={capitalizeFirstLetter(filter)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
