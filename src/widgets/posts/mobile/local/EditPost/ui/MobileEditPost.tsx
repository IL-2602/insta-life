import React from 'react'

import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { EditPostProps } from '@/widgets/posts/local/EditPost/container'

import s from './MobileEditPost.module.scss'

export const MobileEditPost = ({
  control,
  errorDescription,
  isGetUserLoading,
  isLoadingEditPost,
  myPostDescription,
  t,
  updatePost,
}: EditPostProps) => {
  return (
    !isGetUserLoading && (
      <>
        <form className={s.descriptionWrapper} onSubmit={e => e.preventDefault()}>
          <div>
            <label>
              {t.auth.form.addPublicationDescription}
              <ControlledTextAreaField control={control} name={'myPostDescription'} rows={4} />
              <span className={s.charCount}>{myPostDescription?.length}/500</span>
            </label>
          </div>

          <div className={s.saveChangesBtnBlock}>
            <Button
              disabled={!!errorDescription || isLoadingEditPost}
              isLoading={isLoadingEditPost}
              onClick={updatePost}
              type={'button'}
              variant={'noStyle'}
            >
              {!isLoadingEditPost && (
                <Typography color={'primary'} variant={'h3'}>
                  {t.button.save}
                </Typography>
              )}
            </Button>
          </div>
        </form>
      </>
    )
  )
}
