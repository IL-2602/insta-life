import { memo } from 'react'

import { Props } from '@/layouts/local/ui/CreatePost/PostCropping/container'
import { AddMoreImages } from '@/layouts/local/ui/CreatePost/PostCropping/ui/addMoreImages/addMoreImages'
import { ChangeZoom } from '@/layouts/local/ui/CreatePost/PostCropping/ui/changeZoom/changeZoom'
import { ExpandSize } from '@/layouts/local/ui/CreatePost/PostCropping/ui/expandSize/expandSize'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import 'react-image-crop/src/ReactCrop.scss'

import s from './PostCropping.module.scss'

export const PostCropping = memo(
  ({
    canvasRef,
    control,
    currPhotoIndex,
    delPostPhoto,
    extraActionsPostPhoto,
    imgRef,
    onChangeCurrPhoto,
    postPhoto,
    postPhotoError,
    postPhotos,
    setCurrentPhotoAspect,
    setCurrentPhotoZoom,
    t,
  }: Props) => {
    return (
      <div className={s.container}>
        <div className={s.croppingWrapper}>
          <div className={s.errorWrapper}>
            {postPhotoError && (
              //@ts-ignore
              <Typography variant={'error'}>{t.myProfile.error[postPhotoError]}</Typography>
            )}
          </div>

          <PostPhotos
            cropping
            currentPhoto={currPhotoIndex}
            onChangeCurrentPhoto={onChangeCurrPhoto}
          >
            {postPhotos &&
              postPhotos.map((photo, idx) => (
                <div className={s.imgWrapper} key={photo.img}>
                  <Image
                    alt={`Original Img`}
                    fill
                    ref={imgRef}
                    src={photo.img}
                    style={{
                      objectFit: 'contain',
                      visibility: 'hidden',
                    }}
                  />
                  <Image alt={'Cropped Img'} className={s.croppingImage} fill src={photo.cropImg} />
                </div>
              ))}
          </PostPhotos>

          <div className={s.btnGroup}>
            <ExpandSize aspect={postPhoto?.aspect} setAspect={setCurrentPhotoAspect} t={t} />
            <ChangeZoom setZoom={setCurrentPhotoZoom} zoom={postPhoto?.zoom} />
            <div>
              <AddMoreImages
                control={control}
                delPostPhoto={delPostPhoto}
                extraAction={extraActionsPostPhoto}
                onChangeCurrPhoto={onChangeCurrPhoto}
                photos={postPhotos}
              />
            </div>
          </div>
          <canvas
            ref={canvasRef}
            style={{
              display: 'none',
              height: '100%',
              objectFit: 'contain',
              width: '100%',
            }}
          />
        </div>
      </div>
    )
  }
)
