import { Children, ReactNode, useState } from 'react'

import { NextPhotoArrow } from '@/shared/assets/icons/NextPhotoArrow/NextPhotoArrow'
import { PrevPhotoArrow } from '@/shared/assets/icons/PrevPhotoArrow/PrevPhotoArrow'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'

import s from './PostPhotos.module.scss'

type Props = {
  children?: ReactNode
  className?: string
  cropping?: boolean
  currentPhoto?: number
  height?: number
  onChangeCurrentPhoto?: (currPhoto: number) => void
  width?: number
}

export const PostPhotos = ({
  children,
  cropping,
  currentPhoto = 0,
  height,
  onChangeCurrentPhoto,
  width,
}: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const arrChildren = Children.toArray(children)

  if (currentPhoto != currentPhotoIndex) {
    setCurrentPhotoIndex(currentPhoto)
  }

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
    onChangeCurrentPhoto?.(currentPhoto + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
    onChangeCurrentPhoto?.(currentPhoto - 1)
  }

  const isFirstPhoto = (currentPhoto || currentPhotoIndex) === 0
  const isLastPhoto =
    arrChildren[arrChildren.length - 1] === arrChildren[currentPhoto || currentPhotoIndex]

  return (
    <div className={s.photosWrapper} style={{ height, width }}>
      {arrChildren[currentPhoto]}
      {arrChildren.length > 1 && (
        <>
          <Button
            className={clsx(s.btn, s.prevBtn, cropping ? s.dark : '')}
            disabled={isFirstPhoto}
            onClick={goToPrevPhoto}
            variant={'noStyle'}
          >
            <PrevPhotoArrow className={s.prevArrow} />
          </Button>
          <Button
            className={clsx(s.btn, s.nextBtn, cropping ? s.dark : '')}
            disabled={isLastPhoto}
            onClick={goToNextPhoto}
            variant={'noStyle'}
          >
            <NextPhotoArrow className={s.nextArrow} />
          </Button>
          <div className={clsx(s.photoScale, cropping ? s.transparent : '')}>
            {arrChildren.map((_, index) => (
              <span
                className={clsx(
                  s.circle,
                  (currentPhoto || currentPhotoIndex) === index ? s.circlePrimary : ''
                )}
                key={index}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
