import { Fragment, forwardRef } from 'react'

import { PublicPhotos } from '@/shared/components/PubicPhotos/PublicPhotos'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { PostComments } from '@/widgets/home/local/PostComments/PostComments'
import { PostDescription } from '@/widgets/home/local/PostDescription/PostDescription'
import { PostHeader } from '@/widgets/home/local/PostHeader/PostHeader'
import { PostIcons } from '@/widgets/home/local/PostIcons/PostIcons'
import { PostLikes } from '@/widgets/home/local/PostLikes/PostLikes'
import { HomeProps } from '@/widgets/home/publ/container'

import s from './Home.module.scss'

export const Home = forwardRef<HTMLDivElement, HomeProps>(({ isFetching, posts }, ref) => {
  if (!posts) {
    return (
      <div className={s.fetchSpinner}>
        <SpinnerThreePoints />
      </div>
    )
  }

  return (
    <div className={s.container}>
      {posts.items.map(post => {
        const images = post.images.map(img => img.url)

        return (
          <Fragment key={post.id}>
            <PostHeader avatar={post.avatarOwner} time={post.createdAt} userName={post.userName} />
            <PublicPhotos
              height={505}
              home
              id={post.id}
              ownerId={post.ownerId}
              photos={images}
              width={490}
            />
            <PostIcons />
            <PostDescription
              avatar={post.avatarOwner}
              description={post.description}
              userName={post.userName}
            />
            <PostLikes postId={post.id} />
            <PostComments />
          </Fragment>
        )
      })}

      <div ref={ref}></div>
      {isFetching && (
        <div className={s.fetchSpinner}>
          <SpinnerThreePoints />
        </div>
      )}
    </div>
  )
})
