import { memo } from 'react'

import { DeletePostModal } from '@/layouts/local/ui/DeletePost/DeletePostModal'
import { EditPostModal } from '@/layouts/local/ui/EditPost/EditPostModal'
import { MyPostModalProps } from '@/layouts/local/ui/MyPost/MyPostModal/container'
import { TestComment } from '@/layouts/local/ui/MyPost/TESTcomment/Comment'
import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { PostOptions } from '@/shared/ui/PostOptions/PostOptions'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './MyPostModal.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

type PhotoType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export const MyPostModal = memo(
  ({
    closeModalWithRefresh,
    commentPublish,
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
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                {postPhotos &&
                  postPhotos.images.map((photo: PhotoType, i: number) => {
                    return (
                      <div key={i}>
                        <img alt={'photo'} className={s.postPhoto} src={photo.url} />
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
                            src={postPhotos?.avatarOwner}
                            width={36}
                          />
                        )}
                      </div>
                      <Typography variant={'h3'}>{postPhotos?.userName}</Typography>
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
                        <div style={{ position: 'relative' }}>
                          <HorizontalDots />
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className={s.commentsBlock}>
                  <TestComment />
                  <TestComment />
                  <TestComment />
                </div>
                <div className={s.likesBlock}>
                  <div className={s.buttonIcons}>
                    <div>
                      <HeartOutline className={s.buttonIcon} />
                      <PaperLine className={s.buttonIcon} />
                    </div>

                    <Bookmark className={s.buttonIcon} />
                  </div>
                </div>
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
        <EditPostModal.widget />
        <DeletePostModal.widget />
      </>
    )
  }
)
