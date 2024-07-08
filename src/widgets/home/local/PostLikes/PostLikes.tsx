import { useGetPostLikesQuery } from '@/services/likesService/likesEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostLikes.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostLikes = ({ postId }: Props) => {
  const { t } = useTranslation()
  const { data: likes } = useGetPostLikesQuery({ postId })

  if (!likes) {
    return (
      <div className={s.spinner}>
        <SpinnerThreePoints />
      </div>
    )
  }

  const lastThreeLikes = likes.items.slice(0, 3)

  const avatars = lastThreeLikes.map(like => {
    return like.avatars
  })

  return (
    <div className={s.container}>
      <div className={s.likesPhotos}>
        {avatars.map((avatar, id) => {
          return (
            <div className={s.avatarContainer} key={id}>
              {avatar[0] ? (
                <Image alt={'likes'} height={24} src={avatar[0].url} width={24} />
              ) : (
                <div className={s.noAvatar}>
                  <Image alt={'noAvatar'} height={16} src={noAvatar} width={16} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <Typography
        className={likes.totalCount > 0 ? s.likesCount : s.marginNone}
        variant={'regular14'}
      >
        {likes.totalCount}
      </Typography>
      <Typography variant={'bold14'}>&quot;{t.post.like}&quot;</Typography>
    </div>
  )
}

type Props = {
  postId: number
}
