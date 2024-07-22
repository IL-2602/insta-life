import { Fragment, memo } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { ScrollSelect } from '@/shared/ui/ScrollSelect/ScrollSelect'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextAreaField } from '@/shared/ui/controlledInsta/ControlledTextArea/ControlledTextArea'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { CommentsAnswersProps } from '@/widgets/posts/local/CommentsLists/container'
import { useRouter } from 'next/router'
import { Comment } from 'src/widgets/posts/local/Comment'

import s from './MobileCommentsList.module.scss'

export const MobileCommentsList = memo(
  ({
    commentPublishHandler,
    control,
    isLoadingPost,
    isMe,
    postDescription,
    postPhotos,
    t,
  }: CommentsAnswersProps) => {
    const { locale } = useRouter()

    return (
      <div className={s.commentsBlockWrapper}>
        <div className={s.likesBlock}>
          <div className={s.buttonIcons}>
            <div className={s.buttonIconWrapper}>
              <Button className={s.buttonIcon} variant={'noStyle'}>
                <HeartOutline />
              </Button>
              <Button className={s.buttonIcon} variant={'noStyle'}>
                <PaperLine />
              </Button>
            </div>
            <Button className={s.buttonIcon} variant={'noStyle'}>
              <Bookmark />
            </Button>
          </div>
        </div>
        <div className={s.commentsBlock}>
          {isLoadingPost && <Skeleton height={64} width={'100%'} />}
          {!isLoadingPost && postDescription && postPhotos && (
            <div className={s.postDescription}>
              <div className={s.avatarWrapper}>
                <Avatar userAvatar={postPhotos?.avatarOwner} />
              </div>
              <div className={s.descriptionWrapper}>
                <Typography className={s.description} variant={'regular14'}>
                  {postDescription}
                </Typography>
                <Typography color={'form'} variant={'small'}>
                  {commentsAnswersTimeConversion(postPhotos?.createdAt, locale)}
                </Typography>
              </div>
            </div>
          )}
        </div>
        <div>
          {/*{isMe && (*/}
          {/*  <div className={s.addCommentBlock}>*/}
          {/*    <ControlledTextAreaField*/}
          {/*      control={control}*/}
          {/*      name={'comment'}*/}
          {/*      placeholder={'Add comment...'}*/}
          {/*      textAreaClassName={s.textArea}*/}
          {/*    />*/}
          {/*    <Button*/}
          {/*      className={s.button}*/}
          {/*      disabled={false}*/}
          {/*      onClick={commentPublishHandler}*/}
          {/*      variant={'noStyle'}*/}
          {/*    >*/}
          {/*      <Typography color={'primary'} variant={'h3'}>*/}
          {/*        {t.button.publish}*/}
          {/*      </Typography>*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    )
  }
)
