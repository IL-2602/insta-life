import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetUserPostsQuery } from '@/services/publicService/publicEndpoints'
import { PublicPhotos } from '@/shared/components/PubicPhotos/PublicPhotos'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { PostComments } from '@/widgets/home/local/PostComments/PostComments'
import { PostDescription } from '@/widgets/home/local/PostDescription/PostDescription'
import { PostHeader } from '@/widgets/home/local/PostHeader/PostHeader'
import { PostIcons } from '@/widgets/home/local/PostIcons/PostIcons'
import { PostLikes } from '@/widgets/home/local/PostLikes/PostLikes'

import s from './HomePosts.module.scss'

export const HomePosts = ({ id }: Props) => {
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)
  const [postIds, setPostIds] = useState<number[] | undefined>([])

  const {
    data: posts,
    isFetching,
    isLoading,
  } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 4 : 2,
    userId: 3,
  })

  useEffect(() => {
    if (posts && posts.items.length >= posts.totalCount) {
      return
    }

    if (inView && posts && posts.items.length > 0) {
      setLastPostId(posts.items[posts.items.length - 1].id)
    }
  }, [inView])

  useEffect(() => {
    const postIds = posts?.items.map(item => item.id)

    setPostIds(postIds)
  }, [posts?.items])

  if (!posts || isLoading) {
    return (
      <div className={s.spinner}>
        <SpinnerThreePoints />
      </div>
    )
  }

  return (
    <>
      {posts?.items.map(post => {
        const images = post.images.map(img => img.url)

        return (
          <Fragment key={post.id}>
            <PostHeader
              avatar={post.avatarOwner}
              time={post.createdAt}
              userId={id}
              userName={post.userName}
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
            <PostIcons postId={post.id} userId={id} />
            <PostDescription
              avatar={post.avatarOwner}
              description={post.description}
              userName={post.userName}
            />
            <PostLikes postId={post.id} />
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
    </>
  )
}

type Props = {
  id: number
}
