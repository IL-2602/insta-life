import { memo } from 'react'

import { PostDescription } from '@/shared/components/PostDescription/PostDescription'
import { PublicPhotos } from '@/shared/components/PubicPhotos/PublicPhotos'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { NumberOfUsers } from '@/shared/ui/NumberOfUsers'
import { Typography } from '@/shared/ui/Typography'
import { PublicPostsProps } from '@/widgets/root/publicPosts/container'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PublicPosts.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PublicPosts = memo(
  ({ openPosts, posts, setOpenPosts, t, users }: PublicPostsProps) => {
    return (
      <>
        <div className={s.counterWrapper}>
          <Typography variant={'h2'}>{t.post.totalUsers}:</Typography>
          <Typography className={s.counter} variant={'h2'}>
            {NumberOfUsers(users?.totalCount)}
          </Typography>
        </div>
        <section className={s.photosWrapper}>
          {posts?.items.slice(0, 4).map(item => {
            return (
              <div className={s.photoWrapper} key={item.id}>
                <PublicPhotos
                  className={clsx(
                    s.photo,
                    item.description.length > 105 && !openPosts[item.id]
                      ? s.halfPhotoHeight
                      : s.photoHeight
                  )}
                  height={240}
                  photos={item.images.map(img => img.url)}
                  width={234}
                />
                <div className={s.avatarWrapper}>
                  <div className={s.avatar}>
                    {item.avatarOwner === undefined ? (
                      <Image alt={'noUserPhoto'} height={22} src={noAvatar} width={22} />
                    ) : (
                      <Image alt={'userPhoto'} height={36} src={item.avatarOwner} width={36} />
                    )}
                  </div>
                  <Typography variant={'h3'}>{item.userName}</Typography>
                </div>
                <Typography className={s.time} variant={'small'}>
                  <TimeDifference postTime={item.createdAt} />
                </Typography>
                <PostDescription
                  description={item.description}
                  id={item.id}
                  openPosts={openPosts}
                  setOpenPosts={setOpenPosts}
                />
              </div>
            )
          })}
        </section>
      </>
    )
  }
)
