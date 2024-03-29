import { NoCover } from '@/shared/assets/icons/noCover/NoCover'
import Image from 'next/image'
import { Avatar as AvatarType } from 'src/shared/types/profile'

import s from './Avatar.module.scss'

export const Avatar = ({ avatar }: Props) => {
  const avatarRender = avatar ? (
    <Image
      alt={'avatar'}
      className={s.avatar}
      height={avatar.height}
      src={avatar.url}
      width={avatar.width}
    />
  ) : (
    <div className={s.avatarNoCover}>
      <NoCover />
    </div>
  )

  return <>{avatarRender}</>
}

type Props = {
  avatar: AvatarType
}
