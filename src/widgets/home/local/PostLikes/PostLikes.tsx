import { GetLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { useGetLikesQuery } from '@/services/postService/postEndpoints'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostLikes.module.scss'

import testLike1 from '../../../../../public/assets/testLike1.svg'
import testLike2 from '../../../../../public/assets/testLike2.svg'
import testLike3 from '../../../../../public/assets/testLike3.svg'

export const PostLikes = ({ postId }: Props) => {
  const { data: likes } = useGetLikesQuery({ postId })

  if (!likes) {
    return null
  }

  console.log('likes: ', likes)

  const avatars = likes.items.map(like => {
    return like.avatars
  })

  return (
    <div className={s.container}>
      <div className={s.likesPhotos}>
        {avatars.map((avatar, id) => {
          return (
            <div className={s.avatarContainer} key={id}>
              <Image alt={'likes'} height={24} src={avatar[0].url} width={24} />
            </div>
          )
        })}

        {/*<Image alt={'likes'} src={testLike2} />*/}
        {/*<Image alt={'likes'} src={testLike3} />*/}
      </div>
      <Typography className={s.likesCount} variant={'regular14'}>
        {likes.totalCount}
      </Typography>
      <Typography variant={'bold14'}>&quot;Like&quot;</Typography>
    </div>
  )
}

type Props = {
  postId: number
}
