import React, { memo } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { PostPublicationProps } from '@/layouts/local/ui/CreatePost/PostPublication/container'
import { CreatePostModalHeader } from '@/layouts/local/ui/CreatePost/createPostModalHeader'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
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
    handlePublishPhotos,
    handleSubmit,
    isGetUserLoading,
    isLoading,
    onChangeCurrPhoto,
    postDescription,
    postPhotos,
    t,
  }: PostPublicationProps) => {
    return (
      <>
        <CreatePostModalHeader
          btnTitle={t.post.publication}
          nextStep={'filters'}
          onNext={handlePublishPhotos}
          prevStep={'filters'}
          title={t.modal.publicationTitle}
        />

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
                        <div className={s.postPhoto} key={i}>
                          <Image
                            alt={'photo'}
                            fill
                            src={photo.filterImg}
                            style={{ height: '100%', objectFit: 'contain', width: '100%' }}
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
      </>
    )
  }
)
