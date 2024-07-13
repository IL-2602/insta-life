import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { Typography } from '@/shared/ui/Typography'

import s from './PostLikeCounter.module.scss'

export const PostLikeCounter = ({ className, isLiked, likesCount, postLikesData }: Props) => {
  return (
    <div className={`${s.container} ${className ?? ''}`}>
      <div className={s.likesContainer}>
        <div className={s.avatars}></div>
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
  postLikesData?: PostLikesResponse
}
