import { memo } from 'react'
import { ReactCrop } from 'react-image-crop'

import { Props } from '@/layouts/local/ui/CreatePost/PostCropping/container'
import { AddMoreImages } from '@/layouts/local/ui/CreatePost/PostCropping/ui/addMoreImages/addMoreImages'
import { ChangeZoom } from '@/layouts/local/ui/CreatePost/PostCropping/ui/changeZoom/changeZoom'
import { ExpandSize } from '@/layouts/local/ui/CreatePost/PostCropping/ui/expandSize/expandSize'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'

import 'react-image-crop/src/ReactCrop.scss'

import s from './PostCropping.module.scss'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'

export const PostCropping = memo(
  ({
    aspect,
    canvasRef,
    completedCrop,
    control,
    crop,
    hiddenAnchorRef,
    imgRef,
    modalStep,
    onDownloadCropClick,
    onImageLoaded,
    onNext,
    postPhotos,
    setAspect,
    setCompletedCrop,
    setZoom,
    zoom,
    extraActionsPostPhoto,
    currPhoto,
    onChangeCurrPhoto,
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
          <Button variant={'link'}>
            <Typography color={'light'} variant={'h3'}>
              <ArrowIosBack />
            </Typography>
          </Button>
        }
        title={'Cropping'}
      >
        <div className={s.croppingWrapper}>
          <PostPhotos height={490} width={490} cropping currentPhoto={currPhoto}>
            {postPhotos &&
              postPhotos.map((photo, idx) => (
                <div className={s.imgWrapper} key={idx}>
                  <ReactCrop
                    aspect={aspect}
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
                      src={photo}
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
            <ExpandSize aspect={aspect} setAspect={setAspect} />
            <ChangeZoom setZoom={setZoom} zoom={zoom} />
            <div>
              <AddMoreImages
                extraAction={extraActionsPostPhoto}
                control={control}
                photos={postPhotos}
                onChangeCurrPhoto={onChangeCurrPhoto}
              />
            </div>
          </div>
          {/*<a*/}
          {/*  download*/}
          {/*  href={'#hidden'}*/}
          {/*  ref={hiddenAnchorRef}*/}
          {/*  style={{*/}
          {/*    position: 'absolute',*/}
          {/*    top: '-200vh',*/}
          {/*    visibility: 'hidden',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Hidden download*/}
          {/*</a>*/}
        </div>
      </Modal>
    )
  }
)
