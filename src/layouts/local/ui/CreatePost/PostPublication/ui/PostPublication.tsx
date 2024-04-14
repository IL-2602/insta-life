import { memo } from 'react'

import { PostPublicationProps } from '@/layouts/local/ui/CreatePost/PostPublication/container'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './PostPublication.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const PostPublication = memo(
  ({
    backToFilter,
    control,
    errorDescription,
    getProfile,
    handlePublishPhotos,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    isOpenModal,
    locale,
    modalSteps,
    onDiscard,
    onSaveDraft,
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
              disabled={!!errorDescription}
              onClick={handlePublishPhotos}
              variant={'link'}
            >
              {t.button.publish}
            </Button>
          }
          open={isCreatePostModal && modalSteps === 'publication'}
          previousStepBtn={
            <Button className={s.prevBtn} onClick={backToFilter} variant={'link'}>
              <ArrowIosBack />
            </Button>
          }
          title={t.modal.publicationTitle}
        >
          <div className={s.container}>
            <div className={s.postPhotoWrapper}>
              <PostPhotos className={s.postPhoto} height={500} photos={postPhotos} width={1} />
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
        </Modal>
        <Modal
          className={locale === 'ru' ? s.closeModalRu : s.closeModalEn}
          customButtonsBlock={<></>}
          modalHandler={onDiscard}
          open={isOpenModal}
          title={t.modal.closeModalTitle}
        >
          <div className={s.content}>
            <Typography variant={'regular16'}>{t.modal.closeModalTextOne}</Typography>
            <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
            <div className={s.buttonsBlock}>
              <Button disabled={false} onClick={onDiscard} variant={'outlined'}>
                <Typography variant={'h3'}>{t.button.discard}</Typography>
              </Button>
              <Button
                className={s.button}
                disabled={false}
                onClick={onSaveDraft}
                variant={'primary'}
              >
                <Typography variant={'h3'}>{t.button.saveDraft}</Typography>
              </Button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
)
