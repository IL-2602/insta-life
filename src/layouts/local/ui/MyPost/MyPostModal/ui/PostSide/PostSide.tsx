import { TestComment } from '@/layouts/local/ui/MyPost/TESTcomment/Comment'
import { GetCurrentPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { Profile } from '@/shared/types/profile'
import { Button } from '@/shared/ui/Button'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { PostOptions } from '@/shared/ui/PostOptions/PostOptions'
import { ScrollSelect } from '@/shared/ui/ScrollSelect/ScrollSelect'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostSide.module.scss'

import { Local } from '../../../../../../../../locales/en'
import noPhoto from '../../../../../../../../public/assets/noPhoto.svg'

export const PostSide = ({
  commentPublishHandler,
  deletePostModalHandler,
  isMe,
  postDescription,
  postPhotos,
  profile,
  setIsEditPostHandler,
  t,
}: Props) => {
  return (
    <>
      <div className={s.userWrapper}>
        <div className={s.userContainer}>
          <div className={s.userPhotoWrapper}>
            <div className={s.photo}>
              {profile && profile?.avatars[0] === undefined ? (
                <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
              ) : (
                <Image alt={'userPhoto'} height={36} src={postPhotos?.avatarOwner!} width={36} />
              )}
            </div>
            <Typography variant={'h3'}>{postPhotos?.userName}</Typography>
          </div>
        </div>

        {isMe && (
          <div className={s.postOptions}>
            <CustomPopover
              contentChildren={
                <PostOptions
                  deletePostModalHandler={deletePostModalHandler}
                  // editModeHandler={editModeHandler}
                  editPostModalHandler={setIsEditPostHandler}
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
        )}
      </div>

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
          <input placeholder={'Add comment...'} type={'text'} />
          <Button
            className={s.button}
            disabled={false}
            onClick={commentPublishHandler}
            variant={'outlined'}
          >
            <Typography variant={'h3'}>{t.button.publish}</Typography>
          </Button>
        </div>
      )}
    </>
  )
}

type Props = {
  commentPublishHandler: () => void
  deletePostModalHandler: (id: number) => void
  isMe: boolean
  postDescription: null | string
  postPhotos: GetCurrentPostResponse | undefined
  profile: Profile | undefined
  setIsEditPostHandler: () => void
  t: Local
}
