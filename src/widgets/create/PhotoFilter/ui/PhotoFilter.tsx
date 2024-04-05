import React, { useEffect, useRef, useState } from 'react'

import { Photo } from '@/widgets/create/PhotoFilter/mockPhotoData'

const FilterPreviewButton = ({ applyFilter, filter, imageUrl, label }: FilterButtonProps) => (
  <div
    onClick={() => applyFilter(filter)}
    style={{ cursor: 'pointer', display: 'inline-block', margin: '5px' }}
  >
    <img
      alt={label}
      src={imageUrl}
      style={{ filter, height: '100px', objectFit: 'cover', width: '100px' }}
      title={label} // Используем label как заголовок для удобства
    />
    <div style={{ textAlign: 'center' }}>{label}</div>{' '}
    {/* Отображаем название фильтра под миниатюрой */}
  </div>
)

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <canvas ref={canvasRef} />
        <div>
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={'grayscale(100%)'}
            imageUrl={currentImage.url}
            label={'Grayscale'}
          />
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={'sepia(100%)'}
            imageUrl={currentImage.url}
            label={'Sepia'}
          />
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={'invert(100%)'}
            imageUrl={currentImage.url}
            label={'Invert'}
          />
          {/* Имитация инстаграмных фильтров */}
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={'contrast(110%) brightness(120%)'}
            imageUrl={currentImage.url}
            label={'Clarendon'}
          />
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={'grayscale(100%) contrast(105%) brightness(110%)'}
            imageUrl={currentImage.url}
            label={'Moon'}
          />
          <FilterPreviewButton
            applyFilter={applyFilter}
            filter={''}
            imageUrl={currentImage.url}
            label={'Original'}
          />
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

type FilterButtonProps = {
  applyFilter: (filter: string) => void
  filter: string
  imageUrl: string
  label: string
}
