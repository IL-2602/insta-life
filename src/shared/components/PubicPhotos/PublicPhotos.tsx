import { useState } from 'react'

import { NextPhotoArrow } from '@/shared/assets/icons/NextPhotoArrow/NextPhotoArrow'
import { NextPublicPhotoArrow } from '@/shared/assets/icons/NextPublicPhotoArrow/NextPublicPhotoArrow'
import { PrevPhotoArrow } from '@/shared/assets/icons/PrevPhotoArrow/PrevPhotoArrow'
import { PrevPublicPhotoArrow } from '@/shared/assets/icons/PrevPublicPhotoArrow/PrevPublicPhotoArrow'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PublicPhotos.module.scss'

type Props = {
  className?: string
  cropping?: boolean
  height: number
  photos: Array<string>
  width: number
}

export const PublicPhotos = ({ height, photos, width, ...rest }: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
  }

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = photos.length - 1 === currentPhotoIndex

  return (
    <div className={s.photosWrapper}>
      <Image
        alt={'photo'}
        height={height}
        src={photos[currentPhotoIndex]}
        width={width}
        {...rest}
      />
      {photos.length > 1 && (
        <>
          <Button
            className={clsx(s.btn, s.prevBtn)}
            disabled={isFirstPhoto}
            onClick={goToPrevPhoto}
            variant={'noStyle'}
          >
            <PrevPublicPhotoArrow className={s.prevArrow} />
          </Button>
          <Button
            className={clsx(s.btn, s.nextBtn)}
            disabled={isLastPhoto}
            onClick={goToNextPhoto}
            variant={'noStyle'}
          >
            <NextPublicPhotoArrow className={s.nextArrow} />
          </Button>
          <div className={s.photoScale}>
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
