import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { useRouter } from 'next/router'

import s from './ClosePostModal.module.scss'

export const ClosePostModal = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const isClosePostModal = useAppSelector(state => state.postReducer.isClosePostModal)

  const dispatch = useAppDispatch()

  const onDiscard = () => {
    dispatch(postActions.setIsClosePostModal(false))
  }

  const onSaveDraft = () => {
    dispatch(postActions.setIsClosePostModal(false))
    dispatch(postActions.setIsCreatePostModal(false))
    dispatch(postActions.setClearPostPhotos())
  }

  return (
    <Modal
      className={locale === 'ru' ? s.closeModalRu : s.closeModalEn}
      customButtonsBlock={<></>}
      modalHandler={onDiscard}
      open={isClosePostModal}
      title={t.modal.closeModalTitle}
    >
      <div className={s.content}>
        <Typography variant={'regular16'}>{t.modal.closeModalTextOne}</Typography>
        <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
        <div className={s.buttonsBlock}>
          <Button disabled={false} onClick={onDiscard} variant={'outlined'}>
            <Typography variant={'h3'}>{t.button.discard}</Typography>
          </Button>
          <Button className={s.button} disabled={false} onClick={onSaveDraft} variant={'primary'}>
            <Typography variant={'h3'}>{t.button.saveDraft}</Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
