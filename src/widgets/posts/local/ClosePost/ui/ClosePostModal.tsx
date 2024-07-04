import React, { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { ClosePostProps } from '@/widgets/posts/local/ClosePost/container'

import s from './ClosePostModal.module.scss'

export const ClosePostModal = memo(
  ({
    handleCloseEditPostDialog,
    handleClosePostDialog,
    isCloseEditPostModal,
    t,
  }: ClosePostProps) => {
    return (
      <Modal
        className={s.closePostModal}
        customButtonsBlock={
          <div className={s.buttonsBlock}>
            <Button disabled={false} onClick={handleClosePostDialog} variant={'outlined'}>
              <Typography variant={'h3'}>{t.button.yes}</Typography>
            </Button>
            <Button
              className={s.button}
              disabled={false}
              onClick={handleCloseEditPostDialog}
              variant={'primary'}
            >
              <Typography variant={'h3'}>{t.button.no}</Typography>
            </Button>
          </div>
        }
        modalHandler={handleCloseEditPostDialog}
        open={isCloseEditPostModal}
        title={t.modal.closeModalTitle}
      >
        <div className={s.closeOpenModalContent}>
          <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
        </div>
      </Modal>
    )
  }
)
