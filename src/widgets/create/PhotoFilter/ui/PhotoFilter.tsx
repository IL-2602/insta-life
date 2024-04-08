import React, { forwardRef, useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { FilterPreviewButton } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButton'
import { photoFilters } from '@/widgets/create/PhotoFilter/FilterPreviewButton/FilterPreviewButtonData'
import { PhotoFilterProps } from '@/widgets/create/PhotoFilter/container'
import { capitalizeFirstLetter } from '@/widgets/create/PhotoFilter/utils/capitalizeFirstLetter'

export const PhotoFilter = forwardRef<HTMLCanvasElement, PhotoFilterProps>(
  ({ applyFilter, currentImage, modalIsOpen, saveImage, savedImage, setModalIsOpen }, ref) => {
    const openModalHandle = () => {
      setModalIsOpen(true)
      applyFilter('normal')
    }

    return (
      <>
        <Button onClick={openModalHandle}>Open</Button>
        <Modal onSubmit={() => setModalIsOpen(false)} open={modalIsOpen}>
          <div
            style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}
          >
            <canvas ref={ref} />
            <div>
              {photoFilters.map(filter => (
                <FilterPreviewButton
                  applyFilter={applyFilter}
                  filter={filter}
                  imageUrl={currentImage.url}
                  key={filter}
                  label={capitalizeFirstLetter(filter)}
                />
              ))}
            </div>
            <button onClick={saveImage} style={{ border: '2px solid var(--color-primary-100)' }}>
              Сохранить
            </button>
          </div>
        </Modal>

        {savedImage && (
          <img alt={'Saved'} src={savedImage} style={{ marginTop: '20px' }} width={'200px'} />
        )}
      </>
    )
  }
)
