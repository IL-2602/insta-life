import React from 'react'
import s from './EditPost.module.scss'
import Image from 'next/image'
import noPhoto from '../../../../../../../../../public/assets/noPhoto.svg'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { Button } from '@/shared/ui/Button'
import { Profile } from '@/shared/types/profile'
import { GetCurrentPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { Local } from '../../../../../../../../../locales/en'
import { FieldError } from 'react-hook-form'
import { Modal } from '@/shared/ui/Modal'

export const EditPost = ({
  isGetUserLoading,
  postPhotos,
  t,
  errorDescription,
  control,
  profile,
  handleSubmit,
  isLoadingEditPost,
  editPostDescription,
  updatePost,
  isOpenClosePostModal,
  handleClosePostModal,
  closeModalWithRefresh,
  handleCloseEditPostDialog,
}: Props) => {
  return (
    !isGetUserLoading && (
      <>
        <form className={s.descriptionWrapper} onSubmit={handleSubmit}>
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
              <ControlledTextAreaField
                control={control}
                defaultValue={postPhotos?.description}
                name={'editPostDescription'}
                rows={4}
              />
              <span className={s.charCount}>{editPostDescription?.length}/500</span>
            </label>
          </div>

          <div className={s.saveChangesBtnBlock}>
            <Button
              disabled={!!errorDescription || isLoadingEditPost}
              onClick={updatePost}
              variant={'primary'}
            >
              <Typography variant={'h3'}>{t.button.saveChanges}</Typography>
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
  isOpenClosePostModal: boolean
  handleClosePostModal: () => void
  closeModalWithRefresh: () => void
  isGetUserLoading: boolean
  handleSubmit: () => void
  isLoadingEditPost: boolean
  profile: Profile | undefined
  editPostDescription: any
  updatePost: () => void
  postPhotos: GetCurrentPostResponse | undefined
  t: Local
  errorDescription: FieldError | undefined
  control: any
  handleCloseEditPostDialog: () => void
}
