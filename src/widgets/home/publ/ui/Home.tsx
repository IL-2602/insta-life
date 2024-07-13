import { Fragment, forwardRef } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { PublicPhotos } from '@/shared/components/PubicPhotos/PublicPhotos'
import { ROUTES } from '@/shared/constants/routes'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { Typography } from '@/shared/ui/Typography'
import { PostComments } from '@/widgets/home/local/PostComments/PostComments'
import { PostDescription } from '@/widgets/home/local/PostDescription/PostDescription'
import { PostHeader } from '@/widgets/home/local/PostHeader/PostHeader'
import { PostIcons } from '@/widgets/home/local/PostIcons/PostIcons'
import { PostLikes } from '@/widgets/home/local/PostLikes/PostLikes'
import { HomeProps } from '@/widgets/home/publ/container'
import Link from 'next/link'

import s from './Home.module.scss'

export const Home = forwardRef<HTMLDivElement, HomeProps>(
  ({ isFetching, isInitialLoading, posts, t }, ref) => {
    if (!posts || isInitialLoading) {
      return (
        <div className={s.spinner}>
          <SpinnerThreePoints />
        </div>
      )
    }

    return (
      <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
        <div className={s.container}>
          {posts.totalCount === 0 && (
            <div className={s.noPosts}>
              <Typography as={'h2'} color={'form'} variant={'bold14'}>
                {t.post.noPosts}
              </Typography>
              <Link href={ROUTES.SEARCH}>{t.modal.search}</Link>
            </div>
          )}

          {posts?.items.map((post, _, initialArray) => {
            const images = post.images.map(img => img.url)
            const postIds = initialArray.map(post => post.id)

            return (
              <Fragment key={post.id}>
                <PostHeader
                  avatar={post.avatarOwner}
                  time={post.createdAt}
                  userId={post.ownerId}
                  username={post.userName}
                />
                <PublicPhotos
                  className={s.photos}
                  height={505}
                  home
                  id={post.id}
                  ownerId={post.ownerId}
                  photos={images}
                  width={490}
                />
                <PostIcons
                  description={post.description}
                  isLiked={post.isLiked}
                  postId={post.id}
                  userId={post.ownerId}
                />
                <PostDescription
                  avatar={post.avatarOwner}
                  description={post.description}
                  userName={post.userName}
                />
                <PostLikes likesCount={post.likesCount} postId={post.id} />
                <PostComments postId={post.id} postIds={postIds} time={post.createdAt} />
              </Fragment>
            )
          })}

          <div className={s.inView} ref={ref}></div>
          {isFetching && (
            <div className={s.fetchSpinner}>
              <SpinnerThreePoints />
            </div>
          )}
        </div>
      </SkeletonTheme>
    )
  }
)
