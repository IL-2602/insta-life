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
    modalStep,
    onChangeCurrPhoto,
    onImageLoaded,
    onNext,
    onPrev,
    postPhoto,
    postPhotos,
    setCompletedCrop,
    updatePostPhoto,
    setCurrentPhotoZoom,
    setZoom,
    zoom,
  }: Props) => {
    return (
      <Modal
        className={s.container}
        customButtonsBlock={<></>}
        nextStepBtn={
          <Button onClick={onNext} variant={'link'}>
            <Typography color={'primary'} variant={'h3'}>
              Next
            </Typography>
          </Button>
        }
        open={modalStep === 'cropping'}
        previousStepBtn={
          <Button onClick={onPrev} variant={'link'}>
            <Typography color={'light'} variant={'h3'}>
              <ArrowIosBack />
            </Typography>
          </Button>
        }
        title={'Cropping'}
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
                  {!!completedCrop && (
                    <canvas
                      ref={canvasRef}
                      style={{
                        height: '100%',
                        objectFit: 'contain',
                        width: '100%',
                      }}
                    />
                  )}
                </div>
              ))}
          </PostPhotos>

          <div className={s.btnGroup}>
            <ExpandSize aspect={postPhoto?.aspect} setAspect={updatePostPhoto} />
            <ChangeZoom setZoom={updatePostPhoto} zoom={postPhoto?.zoom} />
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
        </div>
      </Modal>
    )
  }
)
