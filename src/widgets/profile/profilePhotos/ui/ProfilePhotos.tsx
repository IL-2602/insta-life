import { forwardRef } from 'react'

import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { ProfilePhotosProps } from '@/widgets/profile/profilePhotos/container'
import Image from 'next/image'

import s from './ProfilePhotos.module.scss'

export const ProfilePhotos = forwardRef<HTMLDivElement, ProfilePhotosProps>(
  ({ isFetching, photos, test }, ref) => {
    return (
      <>
        <div className={s.container}>
          {test.length === photos.length
            ? test.map((photo: string, i: number) => (
                <div className={s.imageContainer} key={i}>
                  <Image alt={'postPhotos'} height={228} src={photo} width={234} />
                </div>
              ))
            : photos.map((photo: string, i: number) => (
                <div className={s.imageContainer} key={i}>
                  <Image alt={'postPhotos'} height={228} src={photo} width={234} />
                </div>
              ))}
          <div ref={ref} />
        </div>
        {isFetching && (
          <div className={s.fetchSpinner}>
            <SpinnerThreePoints />
          </div>
        )}
      </>
    )
  }
)
