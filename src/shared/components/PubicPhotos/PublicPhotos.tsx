import { useEffect, useState } from 'react'

import { MobileLeftArrow } from '@/shared/assets/icons/MobileLeftArrow/MobileLeftArrow'
import { MobileRightArrow } from '@/shared/assets/icons/MobileRightArrow/MobileRightArrow'
import { NextPhotoArrow } from '@/shared/assets/icons/NextPhotoArrow/NextPhotoArrow'
import { NextPublicPhotoArrow } from '@/shared/assets/icons/NextPublicPhotoArrow/NextPublicPhotoArrow'
import { PrevPhotoArrow } from '@/shared/assets/icons/PrevPhotoArrow/PrevPhotoArrow'
import { PrevPublicPhotoArrow } from '@/shared/assets/icons/PrevPublicPhotoArrow/PrevPublicPhotoArrow'
import { useResize } from '@/shared/hooks/useResize'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './PublicPhotos.module.scss'

type Props = {
  className?: string
  cropping?: boolean
  height: number
  home?: boolean
  id: number
  ownerId: number
  photos: Array<string>
  width: number
}

export const PublicPhotos = ({ height, home, id, ownerId, photos, width, ...rest }: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
  }

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = photos.length - 1 === currentPhotoIndex

  const { width: windowWidth } = useResize()

  const isHomeRightArrow = () => {
    if (home && windowWidth <= 810) {
      return <MobileRightArrow className={s.nextArrow} />
    } else if (home && windowWidth > 810) {
      return <NextPhotoArrow className={s.nextArrow} />
    } else {
      return <NextPublicPhotoArrow className={s.nextArrow} />
    }
  }

  const isHomeLeftArrow = () => {
    if (home && windowWidth <= 810) {
      return <MobileLeftArrow className={s.prevArrow} />
    } else if (home && windowWidth > 810) {
      return <PrevPhotoArrow className={s.prevArrow} />
    } else {
      return <PrevPublicPhotoArrow className={s.prevArrow} />
    }
  }

  return (
    <div className={s.photosWrapper}>
      <Link href={`profile/${ownerId}?postId=${id}`} key={id}>
        <Image
          alt={'photo'}
          height={height}
          src={photos[currentPhotoIndex]}
          width={width}
          {...rest}
        />
      </Link>
      {photos.length > 1 && (
        <>
          <Button
            className={clsx(!home ? s.btn : s.homeBtn, s.prevBtn)}
            disabled={isFirstPhoto}
            onClick={goToPrevPhoto}
            variant={'noStyle'}
          >
            {isHomeLeftArrow()}
          </Button>
          <Button
            className={clsx(!home ? s.btn : s.homeBtn, s.nextBtn)}
            disabled={isLastPhoto}
            onClick={goToNextPhoto}
            variant={'noStyle'}
          >
            {isHomeRightArrow()}
          </Button>
          <div className={home ? s.homeScale : s.photoScale}>
            {photos.map((photo, index) => (
              <span
                className={clsx(
                  home ? s.homeCircle : s.circle,
                  currentPhotoIndex === index ? s.circlePrimary : ''
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
