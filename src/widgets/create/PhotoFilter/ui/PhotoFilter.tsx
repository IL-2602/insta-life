import React, { useEffect, useRef, useState } from 'react'

import { FilterPreviewButton } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButton'
import { photoFilters } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { Photo } from '@/widgets/create/PhotoFilter/mockPhotoData'
import { capitalizeFirstLetter } from '@/widgets/create/PhotoFilter/utils/capitalizeFirstLetter'

export const PhotoFilter = ({ images }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImage, setCurrentImage] = useState<Photo>(images[0])
  const [currentFilter, setCurrentFilter] = useState<string>('')
  const [savedImage, setSavedImage] = useState<string>('')

  useEffect(() => {
    if (canvasRef.current && currentImage) {
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
  }, [currentImage, currentFilter])

  const applyFilter = (filter: string) => {
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

  return (
    <>
      <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
        <canvas ref={canvasRef} />
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
        <button onClick={saveImage} style={{ border: '2px solid var(--color-primary-100)' }}>
          Сохранить
        </button>
      </div>

      {savedImage && (
        <img alt={'Saved'} src={savedImage} style={{ marginTop: '20px' }} width={'200px'} />
      )}
    </>
  )
}

type Props = {
  images: Photo[]
}
