import { forwardRef } from 'react'

import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { ProfilePhotosProps } from '@/widgets/profile/profilePhotos/container'
import Image from 'next/image'

import s from './ProfilePhotos.module.scss'

export const ProfilePhotos = forwardRef<HTMLDivElement, ProfilePhotosProps>(
  ({ handleReceivingPostId, isFetching, profilePosts }, ref) => {
    return (
      <>
        <div className={s.container}>
          {profilePosts &&
            profilePosts.map((item: PublishPostResponse) => {
              return (
                <div
                  className={s.imageContainer}
                  key={item.id}
                  onClick={() => handleReceivingPostId(item.id)}
                >
                  <Image alt={'postPhotos'} height={228} src={item.images[0].url} width={234} />
                </div>
              )
            })}

          <div className={s.viewRef} ref={ref} />
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
