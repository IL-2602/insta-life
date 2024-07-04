import { forwardRef } from 'react'

import { PublishPostResponse } from '@/services/postService/lib/postEndpoints.types'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { PostModal } from '@/widgets/posts'
import Image from 'next/image'

import s from 'src/widgets/profile/publ/postsList/ui/PostsList.module.scss'

import { PostsListProps } from '../container'

export const PostsList = forwardRef<HTMLDivElement, PostsListProps>(
  ({ handleReceivingPostId, isFetching, posts }, ref) => {
    return (
      <>
        <div className={s.container}>
          {posts &&
            posts.items.map((item: PublishPostResponse) => {
              return (
                <div
                  className={s.imageContainer}
                  key={item.id}
                  onClick={() => {
                    handleReceivingPostId(item.id)
                  }}
                >
                  {item.images[0] && (
                    <Image
                      alt={'photo'}
                      height={228}
                      priority
                      src={item.images[0].url}
                      width={234}
                    />
                  )}
                </div>
              )
            })}

          <div className={s.viewRef} ref={ref} />
        </div>
        {isFetching && (
          <div className={s.fetchSpinner}>
            <SpinnerThreePoints />
          </div>
        )}
        <PostModal.widget />
      </>
    )
  }
)
