import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostDescription.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostDescription = ({ avatar, description, userName }: Props) => {
  return (
    <div className={s.container}>
      {avatar ? (
        <Image alt={'avatar'} className={s.avatar} height={36} src={avatar} width={36} />
      ) : (
        <div className={s.noAvatar}>
          <Image alt={'avatar'} height={24} src={noAvatar} width={24} />
        </div>
      )}
      <div className={s.description}>
        <Typography as={'h3'} variant={'bold14'}>
          {userName}
        </Typography>
        <Typography variant={'regular14'}>{description}</Typography>
      </div>
    </div>
  )
}

type Props = {
  avatar: string
  description: string
  userName: string
}
