import { memo } from 'react'

import { PostPublicationProps } from '@/layouts/local/ui/CreatePost/PostPublication/container'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import Image from 'next/image'

import s from './PostPublication.module.scss'

import noPhoto from '../../../../../../../public/assets/noPhoto.svg'

export const PostPublication = memo(
  ({
    backToFilter,
    control,
    errorDescription,
    getProfile,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    modalSteps,
    postDescription,
    postPhotos,
    t,
  }: PostPublicationProps) => {
    return (
      <Modal
        className={s.modal}
        customButtonsBlock={<></>}
        modalHandler={() => {}}
        nextStepBtn={
          <Button className={s.nextBtn} disabled={!!errorDescription} variant={'link'}>
            {t.button.publish}
          </Button>
        }
        open={isCreatePostModal && modalSteps === 'publication'}
        // open
        previousStepBtn={
          <Button className={s.prevBtn} onClick={backToFilter} variant={'link'}>
            <ArrowIosBack />
          </Button>
        }
        title={t.modal.publicationTitle}
      >
        <div className={s.container}>
          <div className={s.postPhotoWrapper}>
            <Image
              alt={'postPhoto'}
              className={s.postPhoto}
              height={500}
              src={postPhotos[0]}
              width={1}
            />
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
                <ControlledTextAreaField control={control} name={'postDescription'} />
                <span className={s.charCount}>{postDescription?.length}/500</span>
              </label>
              <hr className={s.line}></hr>
            </form>
          )}
        </div>
      </Modal>
    )
  }
)
