import { memo } from 'react'

import { PostPublicationProps } from '@/layouts/local/ui/CreatePost/PostPublication/container'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { ClosePostModal } from '@/shared/components/ClosePostModal/ClosePostModal'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostPublication.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const PostPublication = memo(
  ({
    control,
    currPhotoIndex,
    getProfile,
    handleSubmit,
    isGetUserLoading,
    isLoading,
    onChangeCurrPhoto,
    postDescription,
    postPhotos,
    t,
  }: PostPublicationProps) => {
    return (
      <div className={s.modal}>
        <div>
          <div className={clsx(s.container, isLoading ? s.opacity : '')}>
            {isLoading && (
              <div className={s.spinner}>
                <Spinner />
              </div>
            )}
            <div className={clsx(s.postPhotoWrapper, isLoading ? s.opacity : '')}>
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                {postPhotos &&
                  postPhotos.map((photo, i) => {
                    return (
                      <div key={i} className={s.postPhoto}>
                        <Image
                          alt={'photo'}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          src={photo.filterImg}
                          fill
                        />
                      </div>
                    )
                  })}
              </PostPhotos>
            </div>
            {!isGetUserLoading && (
              <form className={s.descriptionWrapper} onSubmit={handleSubmit(() => {})}>
                <div className={s.userPhotoWrapper}>
                  <div className={s.photo}>
                    {getProfile?.avatars[0] === undefined ? (
                      <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
                    ) : (
                      <Image
                        alt={'userPhoto'}
                        height={36}
                        src={getProfile?.avatars[0].url}
                        width={36}
                      />
                    )}
                  </div>
                  <Typography variant={'medium16'}>{getProfile?.userName}</Typography>
                </div>
                <label>
                  {t.auth.form.addPublicationDescription}
                  <ControlledTextAreaField control={control} name={'postDescription'} rows={4} />
                  <span className={s.charCount}>{postDescription?.length}/500</span>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }
)
