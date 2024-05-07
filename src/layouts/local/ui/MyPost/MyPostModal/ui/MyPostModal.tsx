import { memo } from 'react'

import { DeletePostModal } from '@/layouts/local/ui/DeletePost/DeletePostModal'
import { EditPostModal } from '@/layouts/local/ui/EditPost/EditPostModal'
import { MyPostModalProps } from '@/layouts/local/ui/MyPost/MyPostModal/container'

import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'

import { Modal } from '@/shared/ui/Modal'

import { Spinner } from '@/shared/ui/Spinner'

import Image from 'next/image'

import s from './MyPostModal.module.scss'

import { PostSide } from '@/layouts/local/ui/MyPost/MyPostModal/ui/PostSide/PostSide'
import { EditPost } from '@/layouts/local/ui/MyPost/MyPostModal/ui/PostSide/EditPost/EditPost'
import { clsx } from 'clsx'

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
    isEdit,
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
    isLoading,
    isMyPostModal,
    isOpenClosePostModal,
    handleOpenEditPostDialog,
    setIsEditPostHandler,
    handleCloseEditPostDialog,
    isPostFetching,
    myPostDescription,
    onChangeCurrPhoto,
    postId,
    postPhotos,
    t,
  }: MyPostModalProps) => {
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
    const headerStyle = clsx(s.modal, isEdit && s.editModal)
    return (
      <>
        <Modal
          className={headerStyle}
          customButtonsBlock={<></>}
          modalHandler={!isEdit ? handleCloseModal : handleOpenEditPostDialog}
          open={isMyPostModal}
          title={isEdit ? 'Edit Post' : undefined}
        >
          <div className={s.container}>
            <div className={s.postPhotoWrapper}>
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
            <div className={s.descriptionWrapper}>
              {isEdit ? (
                <EditPost
                  isGetUserLoading={isGetUserLoading}
                  handleSubmit={() => {}}
                  isLoadingEditPost={false}
                  profile={getProfile}
                  editPostDescription={() => {}}
                  updatePost={() => {}}
                  postPhotos={postPhotos}
                  t={t}
                  errorDescription={errorDescription}
                  control={control}
                  closeModalWithRefresh={closeModalWithRefresh}
                  handleClosePostModal={handleClosePostModal}
                  handleCloseEditPostDialog={handleCloseEditPostDialog}
                  isOpenClosePostModal={isOpenClosePostModal}
                />
              ) : (
                <PostSide
                  profile={getProfile}
                  postPhotos={postPhotos}
                  t={t}
                  deletePostModalHandler={deletePostModalHandler}
                  setIsEditPostHandler={setIsEditPostHandler}
                  commentPublishHandler={commentPublish}
                />
              )}
            </div>
          </div>
        </Modal>
        <EditPostModal.widget />
        <DeletePostModal.widget />
      </>
    )
  }
)
