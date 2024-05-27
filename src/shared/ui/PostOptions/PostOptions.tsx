import React, { ReactNode } from 'react'

import { DeleteIcon } from '@/shared/assets/icons/Delete'
import { EditIcon } from '@/shared/assets/icons/EditPost'
import { useTranslation } from '@/shared/hooks/useTranslation'

import s from './PostOptions.module.scss'

type Props = {
  deletePostModalHandler?: (id: number) => void
  editModeHandler?: () => void
  editPostModalHandler?: (value: boolean) => void
  id: string
}

type MyPostOptionsType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}

export const PostOptions = (props: Props) => {
  const { t } = useTranslation()
  const myPostOptions: MyPostOptionsType[] = [
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

  return (
    <div className={s.container}>
      {myPostOptions.map(option => (
        <div className={s.option} key={option.title} onClick={option.onClick}>
          <div className={s.icon}>{option.icon}</div>
          <div className={s.title}>{option.title}</div>
        </div>
      ))}
    </div>
  )
}
