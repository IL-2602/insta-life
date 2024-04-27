import { memo } from 'react'

import { PostPublicationProps } from '@/layouts/local/ui/CreatePost/PostPublication/container'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { ClosePostModal } from '@/shared/components/ClosePostModal/ClosePostModal'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostPublication.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const PostPublication = memo(
  ({
    backToFilter,
    control,
    currPhotoIndex,
    errorDescription,
    getProfile,
    handlePublishPhotos,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    isLoading,
    modalSteps,
    onChangeCurrPhoto,
    postDescription,
    postPhotos,
    showModalSaveDraft,
    t,
  }: PostPublicationProps) => {
    if (isGetUserLoading) {
      return <Spinner />
    }

    return (
      <>
        <Modal
          className={s.modal}
          customButtonsBlock={<></>}
          modalHandler={showModalSaveDraft}
          nextStepBtn={
            <Button
              className={s.nextBtn}
              disabled={!!errorDescription || isLoading}
              onClick={handlePublishPhotos}
              variant={'link'}
            >
              {t.button.publish}
            </Button>
          }
          open={isCreatePostModal && modalSteps === 'publication'}
          previousStepBtn={
            <Button
              className={s.prevBtn}
              disabled={isLoading}
              onClick={backToFilter}
              variant={'link'}
            >
              <ArrowIosBack />
            </Button>
          }
          title={t.modal.publicationTitle}
        >
          <>
            <div className={clsx(s.container, isLoading ? s.opacity : '')}>
              {isLoading && (
                <div className={s.spinner}>
                  <Spinner />
                </div>
              )}
              <div className={clsx(s.postPhotoWrapper, isLoading ? s.opacity : '')}>
                <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrPhoto}>
                  {postPhotos &&
                    postPhotos.map((photo, i) => {
                      return (
                        <div key={i}>
                          <img alt={'photo'} className={s.postPhoto} src={photo.filterImg} />
                        </div>
                      )
                    })}
                </PostPhotos>
              </div>
              {!isGetUserLoading && (
                <form className={s.descriptionWrapper} onSubmit={handleSubmit(() => {})}>
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
                    <ControlledTextAreaField control={control} name={'postDescription'} rows={4} />
                    <span className={s.charCount}>{postDescription?.length}/500</span>
                  </label>
                  <hr className={s.line}></hr>
                </form>
              )}
            </div>
          </>
        </Modal>
        <ClosePostModal />
      </>
    )
  }
)
