import Skeleton from 'react-loading-skeleton'

import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetPostLikesQuery } from '@/services/likesService/likesEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import Image from 'next/image'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './PostLikes.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostLikes = ({ likesCount, postId }: Props) => {
  const { t } = useTranslation()
  const { data: likes } = useGetPostLikesQuery({ postId })
  const isPostLikeLoading = useAppSelector(state => state.likeReducer.isPostLikeLoading)

  if (!likes) {
    return null
  }

  const lastThreeLikes = likes.items.slice(0, 3)

  const avatars = lastThreeLikes.map(like => {
    return like.avatars
  })

  const gaps = clsx(
    likesCount === 1 ? s.gap1 : s.likesPhotos,
    likesCount === 2 ? s.gap2 : s.likesPhotos,
    likesCount === 3 ? s.gap3 : s.likesPhotos
  )

  return (
    <div className={clsx(likesCount === 0 ? s.gap0 : s.container, isPostLikeLoading ? gaps : '')}>
      <div className={s.likesPhotos}>
        {isPostLikeLoading ? (
          <div className={s.skeletonsBlock}>
            {likesCount === 1 && (
              <div className={s.skeleton}>
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
              </div>
            )}
            {likesCount === 2 && (
              <div className={clsx(s.skeleton, s.skeletonTwo)}>
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
              </div>
            )}
            {likesCount === 3 && (
              <div className={clsx(s.skeleton, s.skeletonThree)}>
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
                <Skeleton borderRadius={'50%'} enableAnimation height={24} width={24} />
              </div>
            )}
          </div>
        ) : (
          avatars.map((avatar, id) => {
            return (
              <div className={s.avatarContainer} key={id}>
                {avatar[0] && !isPostLikeLoading && (
                  <Image alt={'likes'} height={24} src={avatar[0].url} width={24} />
                )}
                {!avatar[0] && !isPostLikeLoading && (
                  <div className={s.noAvatar}>
                    <Image alt={'noAvatar'} height={14} src={noAvatar} width={14} />
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
      <div className={s.likesCountWrap}>
        <Typography className={s.likesCount} variant={'regular14'}>
          {likesCount}
        </Typography>
        <Typography variant={'bold14'}>&quot;{t.post.like}&quot;</Typography>
      </div>
    </div>
  )
}

type Props = {
  likesCount: number
  postId: number
}
