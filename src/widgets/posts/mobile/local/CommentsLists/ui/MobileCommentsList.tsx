import { memo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Bookmark } from '@/shared/assets/icons/Bookmark'
import { HeartOutline } from '@/shared/assets/icons/Heart/HeartOutline'
import { HeartFullIcon } from '@/shared/assets/icons/HeartFull'
import { PaperLine } from '@/shared/assets/icons/PaperLine'
import { PostFillHeart, PostHeart } from '@/shared/assets/icons/Post'
import { PostLikeCounter } from '@/shared/components/PostLikeCounter/PostLikeCounter'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { commentsAnswersTimeConversion } from '@/shared/utils/commentsAnswersTimeConversion'
import { CommentsAnswersProps } from '@/widgets/posts/local/CommentsLists/container'
import { MobileComments } from '@/widgets/posts/mobile/local/Comments'
import { MobileLikersListModal } from '@/widgets/posts/mobile/local/CommentsLists/LikersListModal/MobileLikersListModal'
import { useRouter } from 'next/router'

import s from './MobileCommentsList.module.scss'

export const MobileCommentsList = memo(
  ({
    comments,
    commentsTotalCount,
    follow,
    isFetchingComments,
    isLoadingPost,
    lastElRef,
    postDescription,
    postLikesData,
    postPhotos,
    unFollow,
    updatePostLikeStatusHandler,
    user,
  }: CommentsAnswersProps) => {
    const { locale } = useRouter()
    const [isOpenComments, setIsOpenComments] = useState(false)
    const [openLikersListModal, setOpenLikersListModal] = useState(false)

    return (
      <>
        <div className={s.commentsBlockWrapper}>
          <div className={s.likesBlock}>
            <div className={s.buttonIcons}>
              <Button
                className={s.buttonIcon}
                onClick={updatePostLikeStatusHandler}
                variant={'noStyle'}
              >
                {postLikesData?.isLiked ? <PostFillHeart /> : <PostHeart />}
              </Button>
              <Button className={s.buttonIcon} variant={'noStyle'}>
                <PaperLine />
              </Button>
              <PostLikeCounter
                className={s.likesContainer}
                isLiked={postPhotos?.isLiked}
                likesCount={postLikesData?.totalCount}
                openLikersList={() => setOpenLikersListModal(true)}
                postLikesData={postLikesData}
                user={user}
              />
              <Button className={s.buttonIcon} variant={'noStyle'}>
                <Bookmark />
              </Button>
            </div>
          </div>
          <div className={s.commentsBlock}>
            {isLoadingPost && <Skeleton height={80} width={'100%'} />}
            {!isLoadingPost && !!comments?.length && (
              <Button onClick={() => setIsOpenComments(true)} variant={'noStyle'}>
                <Typography color={'form'} variant={'small'}>
                  {`View all Comments (${commentsTotalCount})`}
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
        <MobileComments.widget
          comments={comments}
          isFetchingComments={isFetchingComments}
          lastRef={lastElRef}
          onOpen={() => setIsOpenComments(false)}
          open={isOpenComments}
        />
        <MobileLikersListModal
          follow={follow}
          onOpen={() => {
            setOpenLikersListModal(false)
          }}
          open={openLikersListModal}
          postLikesData={postLikesData}
          unFollow={unFollow}
          user={user}
        />
      </>
    )
  }
)
