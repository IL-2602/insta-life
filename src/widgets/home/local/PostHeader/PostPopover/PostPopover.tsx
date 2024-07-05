import React, { ReactNode, useState } from 'react'

import { Copy } from '@/shared/assets/icons/Copy'
import { Person } from '@/shared/assets/icons/Person'
import { useTranslation } from '@/shared/hooks/useTranslation'

import s from './PostPopover.module.scss'

type Props = {
  // deletePostModalHandler?: (id: number) => void
  // editModeHandler?: () => void
  // editPostModalHandler?: (value: boolean) => void
  // id: string
  handleCopyLink: () => void
}

type MyPostPopoverType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}

export const PostPopover = ({ handleCopyLink }: Props) => {
  const { t } = useTranslation()

  const [isFollow, setIsFollow] = useState(false)

  const myPostPopover: MyPostPopoverType[] = [
    {
      icon: <Person />,
      onClick: handleCopyLink,
      title: isFollow ? t.button.follow : t.button.unfollow,
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
