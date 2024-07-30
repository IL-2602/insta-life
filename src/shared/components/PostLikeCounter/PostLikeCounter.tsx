import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { Avatar } from '@/shared/ui/Avatar'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostLikeCounter.module.scss'

export const PostLikeCounter = ({
  className,
  isLiked,
  likesCount,
  openLikersList,
  postLikesData,
}: Props) => {
  const avatarsRender = postLikesData?.items.map(el => (
    <Image
      alt={el.avatars[0].url}
      className={s.avatar}
      height={el.avatars[0].height / 5}
      key={el.id}
      src={el.avatars[0].url}
      style={{ borderRadius: '50%' }}
      width={el.avatars[0].width / 5}
    />
  ))

  return (
    <div className={`${s.container} ${className ?? ''}`}>
      <div className={s.likesContainer}>
        <div className={s.avatars} onClick={openLikersList}>
          {avatarsRender}
        </div>
        <Typography className={s.likeCounter} variant={'bold14'}>
          <Typography variant={'regular14'}>{likesCount}</Typography>
          {` "Like"`}
        </Typography>
      </div>
    </div>
  )
}

type Props = {
  className?: string
  date?: string
  isLiked?: boolean
  likesCount?: number
  openLikersList: () => void
  postLikesData?: PostLikesResponse
}
