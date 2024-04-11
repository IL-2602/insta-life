import { memo } from 'react'

import { ProfilePhotosProps } from '@/widgets/profile/profilePhotos/container'
import Image from 'next/image'

import s from './ProfilePhotos.module.scss'

export const ProfilePhotos = memo(({ postPhotos }: ProfilePhotosProps) => {
  console.log('postPhotos: ', postPhotos)

  return (
    <div className={s.container}>
      {postPhotos.length > 0 ? (
        <Image alt={'rabbit'} height={228} src={postPhotos[0]} width={234} />
      ) : (
        ''
      )}
    </div>
  )
})
