import { useState } from 'react'

import { NextPhotoArrow } from '@/shared/assets/icons/NextPhotoArrow/NextPhotoArrow'
import { PrevPhotoArrow } from '@/shared/assets/icons/PrevPhotoArrow/PrevPhotoArrow'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostPhotos.module.scss'

type Props = {
  className?: string
  cropping?: boolean
  height: number
  photos: Array<string>
  width: number
}

export const PostPhotos = ({ cropping, height, photos, width, ...rest }: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
  }

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = photos[photos.length - 1] === photos[currentPhotoIndex]

  return (
    <div className={s.photosWrapper}>
      <Image
        alt={'postPhoto'}
        height={height}
        src={photos[currentPhotoIndex]}
        width={width}
        {...rest}
      />
      {photos.length > 1 && (
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
            {photos.map((photo, index) => (
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
