import { Typography } from '@/shared/ui/Typography'

import s from './PostLikeCounter.module.scss'

export const PostLikeCounter = ({ className, likes = 2000 }: Props) => {
  const date = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={`${s.container} ${className ?? ''}`}>
      <div className={s.likesContainer}>
        <div className={s.avatars}></div>
        <Typography className={s.likeCounter} variant={'bold14'}>
          <Typography variant={'regular14'}>{likes}</Typography>
          {` "Like"`}
        </Typography>
      </div>
      <Typography className={s.date} variant={'small'}>
        {date}
      </Typography>
    </div>
  )
}

type Props = {
  className?: string
  date?: string
  likes?: number
}
