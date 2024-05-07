import s from './PostSide.module.scss'
import Image from 'next/image'
import noPhoto from '../../../../../../../../public/assets/noPhoto.svg'
import { Typography } from '@/shared/ui/Typography'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { PostOptions } from '@/shared/ui/PostOptions/PostOptions'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { ScrollSelect } from '@/shared/ui/ScrollSelect/ScrollSelect'
import { TestComment } from '@/layouts/local/ui/MyPost/TESTcomment/Comment'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { Button } from '@/shared/ui/Button'
import { Local } from '../../../../../../../../locales/en'
import { Profile } from '@/shared/types/profile'
import { GetCurrentPostResponse } from '@/services/postService/lib/postEndpoints.types'
export const PostSide = ({
  postPhotos,
  profile,
  setIsEditPostHandler,
  deletePostModalHandler,
  commentPublishHandler,
  t,
}: Props) => {
  return (
    <>
      <div className={s.userWrapper}>
        <div className={s.userContainer}>
          <div className={s.userPhotoWrapper}>
            <div className={s.photo}>
              {profile?.avatars[0] === undefined ? (
                <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
              ) : (
                <Image alt={'userPhoto'} height={36} src={postPhotos?.avatarOwner!} width={36} />
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
      </div>

      <div className={s.commentsBlock}>
        <ScrollSelect maxHeight={'300px'} type={'always'}>
          <TestComment />
          <TestComment />
          <TestComment />
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
    </>
  )
}

type Props = {
  profile: Profile | undefined
  postPhotos: GetCurrentPostResponse | undefined
  t: Local
  deletePostModalHandler: (id: number) => void
  setIsEditPostHandler: () => void
  commentPublishHandler: () => void
}
