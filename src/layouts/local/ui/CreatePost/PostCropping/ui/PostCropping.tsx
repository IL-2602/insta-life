import { memo } from 'react'
import { ReactCrop } from 'react-image-crop'

import { Props } from '@/layouts/local/ui/CreatePost/PostCropping/container'
import { AddMoreImages } from '@/layouts/local/ui/CreatePost/PostCropping/ui/addMoreImages/addMoreImages'
import { ChangeZoom } from '@/layouts/local/ui/CreatePost/PostCropping/ui/changeZoom/changeZoom'
import { ExpandSize } from '@/layouts/local/ui/CreatePost/PostCropping/ui/expandSize/expandSize'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'

import 'react-image-crop/src/ReactCrop.scss'

import s from './PostCropping.module.scss'
import Image from 'next/image'

export const PostCropping = memo(
  ({
    canvasRef,
    completedCrop,
    control,
    crop,
    currPhotoIndex,
    delPostPhoto,
    extraActionsPostPhoto,
    imgRef,
    isCreatePostModal,
    modalStep,
    onChangeCurrPhoto,
    onImageLoaded,
    onNext,
    onPrev,
    postPhoto,
    postPhotos,
    setCompletedCrop,
    setCurrentPhotoAspect,
    setCurrentPhotoZoom,
    showSaveDraft,
    t,
  }: Props) => {
    return (
      <Modal
        className={s.container}
        customButtonsBlock={<></>}
        modalHandler={showSaveDraft}
        nextStepBtn={
          <Button onClick={onNext} variant={'link'}>
            <Typography color={'primary'} variant={'h3'}>
              {t.button.next}
            </Typography>
          </Button>
        }
        open={isCreatePostModal && modalStep === 'cropping'}
        previousStepBtn={
          <Button className={s.prevBtn} onClick={onPrev} variant={'link'}>
            <ArrowIosBack />
          </Button>
        }
        title={t.post.cropping}
      >
        <div className={s.croppingWrapper}>
          <PostPhotos
            cropping
            currentPhoto={currPhotoIndex}
            height={490}
            onChangeCurrentPhoto={onChangeCurrPhoto}
            width={490}
          >
            {postPhotos &&
              postPhotos.map((photo, idx) => (
                <div className={s.imgWrapper} key={idx}>
                  <ReactCrop
                    aspect={postPhoto?.aspect}
                    className={s.test}
                    crop={crop}
                    onChange={c => console.log(c)}
                    onComplete={c => setCompletedCrop(c)}
                    style={{ visibility: 'hidden' }}
                  >
                    <img
                      alt={`image Cropping`}
                      onLoad={onImageLoaded}
                      ref={imgRef}
                      src={photo.img}
                      style={{ objectFit: 'contain', visibility: 'hidden' }}
                    />
                  </ReactCrop>
                  <Image
                    className={s.croppingImage}
                    src={photo.cropImg}
                    alt={'Cropped Img'}
                    width={490}
                    height={490}
                  />
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

          {!!completedCrop && (
            <canvas
              ref={canvasRef}
              style={{
                height: '100%',
                objectFit: 'contain',
                width: '100%',
                display: 'none',
              }}
            />
          )}
        </div>
      </Modal>
    )
  }
)
