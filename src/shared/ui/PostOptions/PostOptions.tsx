import React, { ReactNode } from 'react'

import { Copy } from '@/shared/assets/icons/Copy'
import { DeleteIcon } from '@/shared/assets/icons/Delete'
import { EditIcon } from '@/shared/assets/icons/EditPost'
import { FollowIcon } from '@/shared/assets/icons/Follow'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

import s from './PostOptions.module.scss'

type Props = {
  deletePostModalHandler?: (id: number) => void
  editModeHandler?: () => void
  editPostModalHandler?: (value: boolean) => void
  id: string
  isFollowing?: boolean
  unFollowModalHandler?: () => void
}

type PostOptionsType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}
const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://instalife.fun/'

export const PostOptions = (props: Props) => {
  const { asPath } = useRouter()

  const { isFollowing = false } = props

  const { t } = useTranslation()
  const myPostOptions: PostOptionsType[] = [
    {
      icon: <EditIcon />,
      onClick: () => (props.editPostModalHandler ? props.editPostModalHandler(true) : null),
      title: t.button.editPost,
    },
    {
      icon: <DeleteIcon />,
      onClick: () => (props.deletePostModalHandler ? props.deletePostModalHandler(123) : null),
      title: t.button.deletePost,
    },
  ]
  const friendsPostOptions: PostOptionsType[] = [
    {
      icon: <FollowIcon />,
      onClick: () => props.unFollowModalHandler?.(),
      title: t.button.unfollow,
    },
    {
      icon: <Copy />,
      onClick: async () => await navigator.clipboard.writeText(baseUrl + asPath),
      title: t.button.copyLink,
    },
  ]

  const Options = isFollowing ? friendsPostOptions : myPostOptions

  return (
    <div className={s.container}>
      {Options?.map(option => (
        <div className={s.option} key={option.title} onClick={option.onClick}>
          <div className={s.icon}>{option.icon}</div>
          <div className={s.title}>{option.title}</div>
        </div>
      ))}
    </div>
  )
}
