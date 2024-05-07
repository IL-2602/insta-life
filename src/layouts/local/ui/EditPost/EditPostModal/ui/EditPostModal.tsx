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

type PhotoType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export const EditPostModal = memo(
  ({
    closeModalWithRefresh,
    control,
    currPhotoIndex,
    editPostDescription,
    errorDescription,
    getProfile,
    handleCloseModal,
    handleClosePostModal,
    handleSubmit,
    isEditPostModal,
    isGetUserLoading,
    isLoadingEditPost,
    isOpenClosePostModal,
    onChangeCurrPhoto,
    postPhotos,
    t,
    updatePost,
  }: EditPostModalProps) => {
    return (
      <>
        <Modal
          className={s.modal}
          customButtonsBlock={<></>}
          modalHandler={handleCloseModal}
          open={isEditPostModal}
          title={t.modal.editPost}
        >
          <div className={s.container}>
            <div className={s.postPhotoWrapper}>
              {/*<PostPhotos className={s.postPhoto} height={503} photos={postPhotos} width={490} />*/}
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                {postPhotos &&
                  postPhotos.images.map((photo: PhotoType, i: number) => {
                    return (
                      <div className={s.postPhotoWrapper} key={i}>
                        <Image alt={'photo'} className={s.postPhoto} fill src={photo.url} />
                      </div>
                    )
                  })}
              </PostPhotos>
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
                          src={postPhotos?.avatarOwner!}
                          width={36}
                        />
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
                    <span className={s.charCount}>{editPostDescription?.length || 0}/500</span>
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
            )}
          </div>
        </Modal>
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
                  onClick={handleClosePostModal}
                  variant={'primary'}
                >
                  <Typography variant={'h3'}>{t.button.no}</Typography>
                </Button>
              </div>
            }
            modalHandler={handleClosePostModal}
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
  }
)
