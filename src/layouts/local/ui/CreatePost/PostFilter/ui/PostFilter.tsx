import React, { LegacyRef, forwardRef } from 'react'

import { FilterPreviewButton } from '@/layouts/local/ui/CreatePost/PostFilter/FilterPreviewButton/FilterPreviewButton'
import { photoFilters } from '@/layouts/local/ui/CreatePost/PostFilter/FilterPreviewButton/FilterPreviewButtonData'
import { PostFilterProps } from '@/layouts/local/ui/CreatePost/PostFilter/container'
import { capitalizeFirstLetter } from '@/layouts/local/ui/CreatePost/PostFilter/utils/capitalizeFirstLetter'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostFilter.module.scss'

export const PostFilter = forwardRef(
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
    }: PostFilterProps,
    ref: LegacyRef<HTMLCanvasElement>
  ) => {
    if (modalIsOpen && currentImage) {
      return (
        <>
          <div className={s.container}>
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
          </div>
        </>
      )
    }

    return null
  }
)
