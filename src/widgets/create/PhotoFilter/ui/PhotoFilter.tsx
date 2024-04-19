import React, { LegacyRef, forwardRef } from 'react'

import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { FilterPreviewButton } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButton'
import { photoFilters } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { PhotoFilterProps } from '@/widgets/create/PhotoFilter/container'
import { capitalizeFirstLetter } from '@/widgets/create/PhotoFilter/utils/capitalizeFirstLetter'
import Image from 'next/image'

import s from './PhotoFilter.module.scss'
export const PhotoFilter = forwardRef(
  (
    {
      applyFilter,
      currPhotoIndex,
      currentImage,
      modalIsOpen,
      onChangeCurrentImage,
      onNext,
      onPrev,
      postPhotos,
      t,
    }: PhotoFilterProps,
    ref: LegacyRef<HTMLCanvasElement>
  ) => {
    if (modalIsOpen && currentImage) {
      return (
        <>
          <Modal
            className={s.container}
            customButtonsBlock={<></>}
            nextStepBtn={
              <Button onClick={onNext} variant={'link'}>
                <Typography color={'primary'} variant={'h3'}>
                  {t.button.next}
                </Typography>
              </Button>
            }
            open={modalIsOpen}
            previousStepBtn={
              <Button className={s.prevBtn} onClick={onPrev} variant={'link'}>
                <ArrowIosBack />
              </Button>
            }
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '50px',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrentImage}>
                {postPhotos.map((_, i) => (
                  <div
                    className={s.imgWrapper}
                    key={i}
                    style={{ alignItems: 'center', display: 'flex', flexShrink: '1' }}
                  >
                    <Image
                      alt={'current image'}
                      className={s.croppingImage}
                      fill
                      src={currentImage.filterImg}
                    />
                  </div>
                ))}
              </PostPhotos>
              <canvas
                ref={ref}
                style={{
                  display: 'none',
                  height: '100%',
                  objectFit: 'contain',
                  width: '100%',
                }}
              />

              <div className={s.filterPrevBtnContainer}>
                {photoFilters.map(filter => (
                  <FilterPreviewButton
                    applyFilter={applyFilter}
                    filter={filter}
                    imageUrl={currentImage.cropImg}
                    key={filter}
                    label={capitalizeFirstLetter(filter)}
                  />
                ))}
              </div>
            </div>
          </Modal>
        </>
      )
    }

    return null
  }
)
