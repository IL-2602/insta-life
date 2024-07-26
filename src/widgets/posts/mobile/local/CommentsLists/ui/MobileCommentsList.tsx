import { memo } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { CommentsAnswersProps } from '@/widgets/posts/local/CommentsLists/container'
import { Comment } from '@/widgets/posts/mobile/local/Comment'
import { useRouter } from 'next/router'

import s from './MobileCommentsList.module.scss'

export const MobileCommentsList = memo(
  ({ comments, isLoadingPost, postDescription, postPhotos }: CommentsAnswersProps) => {
    const { locale } = useRouter()

    console.log('comments', comments)

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
          {isLoadingPost && <Skeleton height={80} width={'100%'} />}
          {!isLoadingPost && !!comments?.length && (
            <Button variant={'noStyle'}>
              <Typography color={'form'} variant={'small'}>
                {`View all Comments (${comments?.length})`}
              </Typography>
            </Button>
          )}
          {!isLoadingPost && postPhotos && postDescription ? (
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
          ) : (
            <>
              {!!comments?.length && (
                <div className={s.postDescription}>
                  <div className={s.avatarWrapper}>
                    <Avatar userAvatar={comments[0]?.from?.avatars[0]?.url} />
                  </div>
                  <div className={s.descriptionWrapper}>
                    <Typography className={s.description} variant={'regular14'}>
                      {comments[0].content}
                    </Typography>
                    <Typography color={'form'} variant={'small'}>
                      {commentsAnswersTimeConversion(comments[0]?.createdAt, locale)}
                    </Typography>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
)
