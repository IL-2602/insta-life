import { memo } from 'react'

import { DeletePostModal } from '@/layouts/local/ui/DeletePost/DeletePostModal'
import { EditPostModal } from '@/layouts/local/ui/EditPost/EditPostModal'
import { MyPostModalProps } from '@/layouts/local/ui/MyPost/MyPostModal/container'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { PostOptions } from '@/shared/ui/PostOptions/PostOptions'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import Image from 'next/image'

import s from './MyPostModal.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const MyPostModal = memo(
  ({
    closeModalWithRefresh,
    commentPublish,
    commentsTEST,
    control,
    currPhotoIndex,
    deletePostModalHandler,
    editPostModalHandler,
    errorDescription,
    getProfile,
    handleCloseModal,
    handleClosePostModal,
    handleSubmit,
    isGetUserLoading,
    isMyPostModal,
    isOpenClosePostModal,
    myPostDescription,
    onChangeCurrPhoto,
    postPhotos,
    t,
  }: MyPostModalProps) => {
    return (
      <>
        <Modal
          className={s.modal}
          customButtonsBlock={<></>}
          modalHandler={handleCloseModal}
          open={isMyPostModal}
        >
          <div className={s.container}>
            <div className={s.postPhotoWrapper}>
              {/*<PostPhotos className={s.postPhoto} height={503} photos={postPhotos} width={490} />*/}
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                {postPhotos &&
                  postPhotos.map((photo, i) => {
                    return (
                      <div key={i}>
                        <img alt={'photo'} className={s.postPhoto} src={photo.cropImg} />
                      </div>
                    )
                  })}
              </PostPhotos>
            </div>
            {!isGetUserLoading && (
              <div className={s.descriptionWrapper}>
                <div className={s.userWrapper}>
                  <div className={s.userContainer}>
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
                  </div>

                  <div className={s.postOptions}>
                    <CustomPopover
                      contentChildren={
                        <PostOptions
                          deletePostModalHandler={deletePostModalHandler}
                          // editModeHandler={editModeHandler}
                          editPostModalHandler={editPostModalHandler}
                          id={'123'}
                        />
                      }
                      icon={
                        <div>
                          <HorizontalDots />
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className={s.commentsBlock}>COMMENTS</div>
                <div className={s.likesBlock}>Likes</div>
                <div className={s.addCommentBlock}>
                  <input placeholder={'Add comment...'} type={'text'} />
                  <Button
                    className={s.button}
                    disabled={false}
                    onClick={commentPublish}
                    variant={'outlined'}
                  >
                    <Typography variant={'h3'}>{t.button.publish}</Typography>
                  </Button>
                </div>
              </div>
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
        <EditPostModal.widget />
        <DeletePostModal.widget />
      </>
    )
  }
)
