import React, { ReactNode, useEffect } from 'react'

import { useDeletePostMutation } from '@/services/postService/postEndpoints'
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
  const t = useTranslation()
  const [deletePost, { isSuccess }] = useDeletePostMutation()
  const myPostOptions: MyPostOptionsType[] = [
    {
      icon: <EditIcon />,
      onClick: () => (props.editPostModalHandler ? props.editPostModalHandler(true) : null),
      title: 'edit post',
    },
    {
      icon: <DeleteIcon />,
      onClick: () => (props.deletePostModalHandler ? props.deletePostModalHandler(123) : null),
      title: 'delete post',
    },
  ]

  // useEffect(() => {
  //   if (isSuccess) {
  //     props.editPostModeHandler ? props.editPostModeHandler() : null
  //   }
  // }, [isSuccess])

  return (
    <div className={s.container}>
      {myPostOptions.map(option => (
        <div className={s.option} key={option.title} onClick={option.onClick}>
          <div className={s.icon}>{option.icon}</div>
          <div>{option.title}</div>
        </div>
      ))}
    </div>
  )
}
