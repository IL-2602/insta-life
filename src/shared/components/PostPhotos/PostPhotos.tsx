import { Children, ReactNode, useState } from 'react'

import { NextPhotoArrow } from '@/shared/assets/icons/NextPhotoArrow/NextPhotoArrow'
import { PrevPhotoArrow } from '@/shared/assets/icons/PrevPhotoArrow/PrevPhotoArrow'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'

import s from './PostPhotos.module.scss'

type Props = {
  className?: string
  cropping?: boolean
  height: number
  width: number
  currentPhoto?: number
  children?: ReactNode
}

export const PostPhotos = ({ cropping, height, width, children, currentPhoto = 0 }: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentPhoto)
  const arrChildren = Children.toArray(children)
  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
  }

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = arrChildren[arrChildren.length - 1] === arrChildren[currentPhotoIndex]

  return (
    <div className={s.photosWrapper} style={{ height, width }}>
      {arrChildren[currentPhotoIndex]}
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
                className={clsx(s.circle, currentPhotoIndex === index ? s.circlePrimary : '')}
                key={index}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
