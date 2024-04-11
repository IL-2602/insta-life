import { memo } from 'react'

import { EditPostModalProps } from '@/layouts/local/ui/EditPost/EditPostModal/container'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import Image from 'next/image'

import s from './EditPostModal.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const EditPostModal = memo(
  ({
    control,
    editPostDescription,
    errorDescription,
    getProfile,
    handleCloseModal,
    handleSubmit,
    isEditPostModal,
    isGetUserLoading,
    isLoadingEditPost,
    postPhotos,
    t,
    updatePost,
  }: EditPostModalProps) => {
    return (
      <Modal
        className={s.modal}
        customButtonsBlock={<></>}
        modalHandler={handleCloseModal}
        open={isEditPostModal}
        title={t.modal.editPost}
      >
        <div className={s.container}>
          <div className={s.postPhotoWrapper}>
            <PostPhotos className={s.postPhoto} height={503} photos={postPhotos} width={490} />
          </div>
          {!isGetUserLoading && (
            <form className={s.descriptionWrapper} onSubmit={handleSubmit(() => {})}>
              <div>
                <div className={s.userPhotoWrapper}>
                  <div className={s.photo}>
                    {getProfile?.avatars[0] === undefined ? (
                      <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
                    ) : (
                      <Image
                        alt={'userPhoto'}
                        height={36}
                        src={getProfile?.avatars[0].url}
                        width={36}
                      />
                    )}
                  </div>
                  <Typography variant={'medium16'}>{getProfile?.userName}</Typography>
                </div>
                <label>
                  {t.auth.form.addPublicationDescription}
                  <ControlledTextAreaField
                    control={control}
                    name={'editPostDescription'}
                    rows={4}
                  />
                  <span className={s.charCount}>{editPostDescription?.length}/500</span>
                </label>
              </div>

              <div className={s.saveChangesBtnBlock}>
                <Button
                  disabled={errorDescription || isLoadingEditPost}
                  onClick={updatePost}
                  variant={'primary'}
                >
                  <Typography variant={'h3'}>{t.button.saveChanges}</Typography>
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    )
  }
)
