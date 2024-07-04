import { useState } from 'react'

import { ImageIcon } from '@/shared/assets/icons/Image'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './Avatar.module.scss'

export const Avatar = ({ height, userAvatar, width }: Props) => {
  const [isError, setIsError] = useState(false)
  const classNames = {
    img: clsx(userAvatar && s.img),
  }

  return userAvatar && !isError ? (
    <Image
      alt={'User Avatar'}
      className={classNames.img}
      fill
      onError={() => setIsError(true)}
      priority
      src={userAvatar}
    />
  ) : (
    <ImageIcon />
  )
}

type Props = {
  height?: number
  userAvatar?: string
  width?: number
}
