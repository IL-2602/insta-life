import { Control } from 'react-hook-form'

import { GetCurrentPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { ScrollSelect } from '@/shared/ui/ScrollSelect/ScrollSelect'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { CommentsAnswersProps } from '@/widgets/posts/local/CommentsAnswers/container'
import { TestComment } from '@/widgets/posts/local/TESTcomment/Comment'

import s from './CommentsAnswers.module.scss'

import { Local } from '../../../../../../locales/en'
export const CommentsAnswers = ({
  commentPublishHandler,
  control,
  isMe,
  postDescription,
  postPhotos,
  profile,
  t,
}: CommentsAnswersProps) => {
  return (
    <>
      <div className={s.commentsBlock}>
        <ScrollSelect maxHeight={'300px'} type={'always'}>
          {postDescription && (
            <TestComment
              photo={postPhotos?.avatarOwner!}
              postDescription={postDescription}
              profile={profile}
            />
          )}
          <TestComment profile={profile} />
          <TestComment profile={profile} />
          <TestComment profile={profile} />
        </ScrollSelect>
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
      {isMe && (
        <div className={s.addCommentBlock}>
          <ControlledTextAreaField
            control={control}
            name={'comment'}
            placeholder={'Add comment...'}
            textAreaClassName={s.textArea}
          />
          <Button
            className={s.button}
            disabled={false}
            onClick={commentPublishHandler}
            variant={'noStyle'}
          >
            <Typography color={'primary'} variant={'h3'}>
              {t.button.publish}
            </Typography>
          </Button>
        </div>
      )}
    </>
  )
}
