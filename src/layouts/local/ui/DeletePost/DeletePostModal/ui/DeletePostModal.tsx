import { memo } from 'react'

import { DeletePostModalProps } from '@/layouts/local/ui/DeletePost/DeletePostModal/container'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'

import s from './DeletePostModal.module.scss'

export const DeletePostModal = memo(
  ({
    handleCloseModal,
    isDeletePostModal,
    isLoading,
    removePostHandler,
    t,
  }: DeletePostModalProps) => {
    return (
      <Modal
        className={s.modal}
        customButtonsBlock={
          <div className={s.buttonsBlock}>
            <Button disabled={isLoading} onClick={removePostHandler} variant={'outlined'}>
              <Typography variant={'h3'}>{t.button.yes}</Typography>
            </Button>
            <Button
              className={s.button}
              disabled={isLoading}
              onClick={handleCloseModal}
              variant={'primary'}
            >
              <Typography variant={'h3'}>{t.button.no}</Typography>
            </Button>
          </div>
        }
        modalHandler={handleCloseModal}
        open={isDeletePostModal}
        title={t.modal.deletePostTitle}
      >
        <div className={s.content}>
          <Typography variant={'regular16'}>{t.modal.deletePostText}</Typography>
        </div>
      </Modal>
    )
  }
)
