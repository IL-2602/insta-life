import { GetMeResponse } from '@/services/authService/lib/authEndpoints.types'
import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { Avatar } from '@/shared/ui/Avatar'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import Image from 'next/image'
import { element } from 'prop-types'

import s from './PostLikeCounter.module.scss'

export const PostLikeCounter = ({
  className,
  isLiked,
  likesCount,
  openLikersList,
  postLikesData,
  user,
}: Props) => {
  const avatarsRender = () => {
    const avatarsArray = postLikesData?.items.map(el => {
      return (
        <div className={s.photo} key={el.id}>
          <Avatar userAvatar={el.avatars[0] && el.avatars[0].url} />
        </div>
      )
    })

    if (avatarsArray && avatarsArray.length > 3) {
      return avatarsArray.slice(0, 3)
    } else {
      return avatarsArray
    }
  }

  return (
    <div className={`${s.container} ${className ?? ''}`}>
      <div className={s.likesContainer}>
        <div className={s.avatars} onClick={openLikersList}>
          {avatarsRender()}
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
  user: GetMeResponse | unknown
}
