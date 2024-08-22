import { memo } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { PostOptions } from '@/shared/ui/PostOptions/PostOptions'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { DeletePostModal } from '@/widgets/posts/local/DeletePost'
import { MobileClosePostModal } from '@/widgets/posts/mobile/local/ClosePost'
import { MobileCommentsList } from '@/widgets/posts/mobile/local/CommentsLists'
import { MobileEditPost } from '@/widgets/posts/mobile/local/EditPost'
import { PostModalProps } from '@/widgets/posts/publ/container'
import Image from 'next/image'

import s from './MobilePostModal.module.scss'

import noPhoto from '../../../../../../public/assets/noPhoto.svg'

type PhotoType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export const MobilePostModal = memo(
  ({
    currPhotoIndex,
    deletePostModalHandler,
    handleCloseModal,
    handleOpenEditPostDialog,
    handleUnFollow,
    isEdit,
    isFollowing,
    isLoading,
    isMyPostModal,
    isShowOptions,
    onChangeCurrPhoto,
    postId,
    postPhotos,
    setIsEditPostHandler,
    t,
  }: PostModalProps) => {
    if (!postId) {
      return null
    }
    if (isLoading) {
      return (
        <div
          style={{
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            left: '50%',
            position: 'fixed',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
          }}
        >
          <Spinner />
        </div>
      )
    }

    return (
      <>
        <Modal
          bodyClassName={s.modalBody}
          customHeader
          onOpen={!isEdit ? handleCloseModal : handleOpenEditPostDialog}
          open={isMyPostModal}
          title={isEdit ? 'Edit Post' : undefined}
        >
          <div className={s.container}>
            <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
              <div className={s.descriptionWrapper}>
                {isEdit ? (
                  <div className={s.userWrapper}>
                    <div className={s.editContainer}>
                      <Button onClick={handleOpenEditPostDialog} variant={'noStyle'}>
                        <Typography variant={'h2'}>{t.button.cancel}</Typography>
                      </Button>
                      <Typography variant={'h2'}>{t.button.editPost}</Typography>
                    </div>
                  </div>
                ) : (
                  <div className={s.userWrapper}>
                    <div className={s.userContainer}>
                      <div className={s.userPhotoWrapper}>
                        <div className={s.photo}>
                          {postPhotos && Object.hasOwnProperty.call(postPhotos, 'avatarOwner') ? (
                            <Image
                              alt={'userPhoto'}
                              height={36}
                              src={postPhotos?.avatarOwner!}
                              width={36}
                            />
                          ) : (
                            <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
                          )}
                        </div>
                        <Typography variant={'h3'}>{postPhotos?.userName}</Typography>
                      </div>
                    </div>

                    {isShowOptions && (
                      <div className={s.postOptions}>
                        <CustomPopover
                          contentChildren={
                            <PostOptions
                              deletePostModalHandler={deletePostModalHandler}
                              editPostModalHandler={() => setIsEditPostHandler(true)}
                              id={'123'}
                              isFollowing={isFollowing}
                              unFollowModalHandler={handleUnFollow}
                            />
                          }
                          icon={
                            <div style={{ position: 'relative' }}>
                              <HorizontalDots />
                            </div>
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={s.postPhotoWrapper}>
                <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                  {postPhotos &&
                    postPhotos.images.map((photo: PhotoType) => {
                      return (
                        <div className={s.postPhotoWrapper} key={photo.uploadId}>
                          <Image alt={'photo'} className={s.postPhoto} fill src={photo.url} />
                        </div>
                      )
                    })}
                </PostPhotos>
              </div>
              {isEdit ? <MobileEditPost.widget /> : <MobileCommentsList.widget />}
            </SkeletonTheme>
          </div>
        </Modal>
        <DeletePostModal.widget />
        <MobileClosePostModal.widget />
      </>
    )
  }
)
