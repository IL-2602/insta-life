import { memo } from 'react'

import { CreatePostModalProps } from '@/layouts/local/ui/CreatePost/CreatePostModal/container'
import { NoCover } from '@/shared/assets/icons/noCover/NoCover'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'

import s from './CreatePostModal.module.scss'

export const CreatePostModal = memo(
  ({
    control,
    draftFromIndexedDB,
    extraActionsPostPhoto,
    handleSubmit,
    openDraft,
    postPhotoError,
    t,
  }: CreatePostModalProps) => {
    return (
      <div className={s.content}>
        <div className={postPhotoError ? s.photoError : ''}>
          {postPhotoError && (
            //@ts-ignore
            <Typography variant={'error'}>{t.myProfile.error[postPhotoError]}</Typography>
          )}
        </div>

        <form className={s.modalBody} onSubmit={handleSubmit(() => {})}>
          <NoCover className={s.image} />
          <ControlledFileUploader
            className={s.input}
            control={control}
            extraActions={extraActionsPostPhoto}
            fullWidth
            name={'postPhoto'}
          >
            <Typography variant={'h3'}>{t.button.selectFromComputer}</Typography>
          </ControlledFileUploader>
          <Button
            disabled={draftFromIndexedDB === undefined}
            fullWidth
            onClick={openDraft}
            variant={'outlined'}
          >
            <Typography variant={'h3'}>{t.button.openDraft}</Typography>
          </Button>
        </form>
      </div>
    )
  }
)
