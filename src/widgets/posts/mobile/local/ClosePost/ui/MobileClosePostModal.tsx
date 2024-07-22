import React, { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { Typography } from '@/shared/ui/Typography'
import { ClosePostProps } from '@/widgets/posts/local/ClosePost/container'

import s from './MobileClosePostModal.module.scss'

export const MobileClosePostModal = memo(
  ({
    handleCloseEditPostDialog,
    handleClosePostDialog,
    isCloseEditPostModal,
    t,
  }: ClosePostProps) => {
    return (
      <Modal
        contentClassName={s.closePostModal}
        onOpen={handleCloseEditPostDialog}
        open={isCloseEditPostModal}
        title={t.modal.closeModalTitle}
      >
        <div className={s.modalBody}>
          <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
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
      </Modal>
    )
  }
)
