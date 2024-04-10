import { memo } from 'react'

import { Props } from '@/layouts/local/ui/CreatePost/PostCropping/container'
import { AddMoreImages } from '@/layouts/local/ui/CreatePost/PostCropping/ui/addMoreImages/addMoreImages'
import { ChangeZoom } from '@/layouts/local/ui/CreatePost/PostCropping/ui/changeZoom/changeZoom'
import { ExpandSize } from '@/layouts/local/ui/CreatePost/PostCropping/ui/expandSize/expandSize'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'
import 'react-image-crop/src/ReactCrop.scss'
import s from './PostCropping.module.scss'
import { ReactCrop } from 'react-image-crop'

export const PostCropping = memo(
  ({
    aspect,
    control,
    modalStep,
    postPhoto,
    setAspect,
    imgRef,
    canvasRef,
    setZoom,
    hiddenAnchorRef,
    onImageLoaded,
    crop,
    setCompletedCrop,
    onDownloadCropClick,
    completedCrop,
  }: Props) => {
    return (
      <Modal
        className={s.container}
        customButtonsBlock={<></>}
        nextStepBtn={
          <Button variant={'secondary'}>
            <Typography color={'primary'} variant={'h3'}>
              Next
            </Typography>
          </Button>
        }
        open={!!postPhoto && modalStep === 'cropping'}
        previousStepBtn={
          <Button variant={'secondary'}>
            <Typography color={'light'} variant={'h3'}>
              {'<'}
            </Typography>
          </Button>
        }
        title={'Cropping'}
      >
        <div className={s.croppingWrapper}>
          {postPhoto && (
            <div className={s.imgWrapper}>
              <ReactCrop
                aspect={aspect}
                crop={crop}
                onChange={c => setCompletedCrop(c)}
                className={s.test}
                minHeight={500}
              >
                <img
                  alt={`image Cropping`}
                  src={postPhoto}
                  ref={imgRef}
                  onLoad={onImageLoaded}
                  style={{ objectFit: 'contain' }}
                />
              </ReactCrop>
              {!!completedCrop && (
                <canvas
                  ref={canvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              )}
            </div>
          )}
          <div className={s.btnGroup}>
            <ExpandSize aspect={aspect} setAspect={setAspect} />
            <ChangeZoom />
            <Button onClick={onDownloadCropClick}>++</Button>
            <div>
              <AddMoreImages control={control} photo={postPhoto} />
            </div>
          </div>
          <a
            href="#hidden"
            ref={hiddenAnchorRef}
            download
            style={{
              position: 'absolute',
              top: '-200vh',
              visibility: 'hidden',
            }}
          >
            Hidden download
          </a>
        </div>
      </Modal>
    )
  }
)
