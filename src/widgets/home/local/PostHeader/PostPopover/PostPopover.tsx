import React, { ReactNode } from 'react'

import { Copy } from '@/shared/assets/icons/Copy'
import { Person } from '@/shared/assets/icons/Person'
import { useTranslation } from '@/shared/hooks/useTranslation'

import s from './PostPopover.module.scss'

type Props = {
  handleCopyLink: () => void
  isFollowing: boolean | undefined
  subscribeToUser: () => void
  unSubscribeToUser: () => void
}

type MyPostPopoverType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}

export const PostPopover = ({
  handleCopyLink,
  isFollowing,
  subscribeToUser,
  unSubscribeToUser,
}: Props) => {
  const { t } = useTranslation()

  const myPostPopover: MyPostPopoverType[] = [
    {
      icon: <Person />,
      onClick: isFollowing ? unSubscribeToUser : subscribeToUser,
      title: isFollowing ? t.button.unfollow : t.button.follow,
    },
    {
      icon: <Copy />,
      onClick: handleCopyLink,
      title: t.button.copyLink,
    },
  ]

  return (
    <div className={s.container}>
      {myPostPopover.map(option => (
        <div className={s.option} key={option.title} onClick={option.onClick}>
          {option.icon}
          {option.title}
        </div>
      ))}
    </div>
  )
}
