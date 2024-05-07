import React from 'react'
import { FieldError } from 'react-hook-form'

import { GetCurrentPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import Image from 'next/image'

import s from './EditPost.module.scss'

import { Local } from '../../../../../../../../../locales/en'
import noPhoto from '../../../../../../../../../public/assets/noPhoto.svg'

export const EditPost = ({
  closeModalWithRefresh,
  control,
  editPostDescription,
  errorDescription,
  handleCloseEditPostDialog,
  isGetUserLoading,
  isLoadingEditPost,
  isOpenClosePostModal,
  postPhotos,
  profile,
  t,
  updatePost,
}: Props) => {
  return (
    !isGetUserLoading && (
      <>
        <form className={s.descriptionWrapper} onSubmit={e => e.preventDefault()}>
          <div>
            <div className={s.userPhotoWrapper}>
              <div className={s.photo}>
                {profile?.avatars[0] === undefined ? (
                  <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
                ) : (
                  <Image alt={'userPhoto'} height={36} src={postPhotos?.avatarOwner!} width={36} />
                )}
              </div>
              <Typography variant={'medium16'}>{postPhotos?.userName}</Typography>
            </div>
            <label>
              {t.auth.form.addPublicationDescription}
              <ControlledTextAreaField control={control} name={'myPostDescription'} rows={4} />
              <span className={s.charCount}>{editPostDescription?.length}/500</span>
            </label>
          </div>

          <div className={s.saveChangesBtnBlock}>
            <Button
              disabled={!!errorDescription || isLoadingEditPost}
              onClick={updatePost}
              variant={'primary'}
              type={'button'}
              isLoading={isLoadingEditPost}
            >
              {!isLoadingEditPost && <Typography variant={'h3'}>{t.button.saveChanges}</Typography>}
            </Button>
          </div>
        </form>
        {isOpenClosePostModal && (
          <Modal
            className={s.closePostModal}
            customButtonsBlock={
              <div className={s.buttonsBlock}>
                <Button disabled={false} onClick={closeModalWithRefresh} variant={'outlined'}>
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
            open={isOpenClosePostModal}
            title={t.modal.closeModalTitle}
          >
            <div className={s.closeOpenModalContent}>
              <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
            </div>
          </Modal>
        )}
      </>
    )
  )
}

type Props = {
  closeModalWithRefresh: () => void
  control: any
  editPostDescription: string | null
  errorDescription: FieldError | undefined
  handleCloseEditPostDialog: () => void
  isGetUserLoading: boolean
  isLoadingEditPost: boolean
  isOpenClosePostModal: boolean
  postPhotos: GetCurrentPostResponse | undefined
  profile: Profile | undefined
  t: Local
  updatePost: () => void
}
