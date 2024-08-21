import React from 'react'

import { GetMeResponse, UserType } from '@/services/authService/lib/authEndpoints.types'
import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './LikersListModal.module.scss'

export const LikersListModal = ({
  follow,
  onOpen,
  open,
  ownerId,
  postLikesData,
  unFollow,
  user,
}: Props) => {
  const likersRender = postLikesData?.items.map(el => {
    const { userId } = user as UserType
    const isOwner = userId !== el.userId

    return (
      <div className={s.liker} key={el.id}>
        <div className={s.likerInfo}>
          {/*<Image*/}
          {/*  alt={el.userName}*/}
          {/*  height={el.avatars[0].height / 5}*/}
          {/*  key={el.id}*/}
          {/*  src={el.avatars[0].url}*/}
          {/*  style={{ borderRadius: '50%' }}*/}
          {/*  width={el.avatars[0].width / 5}*/}
          {/*/>*/}
          <div className={s.photo}>
            <Avatar userAvatar={el.avatars[0] && el.avatars[0].url} />
          </div>

          <Typography variant={'regular16'}>{el.userName}</Typography>
        </div>
        {isOwner && (
          <>
            {el.isFollowing ? (
              <Button
                onClick={() => unFollow({ userId: el.userId, username: el.userName })}
                variant={'outlined'}
              >
                Unfollow
              </Button>
            ) : (
              <Button onClick={() => follow({ selectedUserId: el.userId, username: el.userName })}>
                Follow
              </Button>
            )}
          </>
        )}
      </div>
    )
  })

  return (
    <Modal onOpen={onOpen} open={open} title={'Likes'}>
      <div className={s.content}>
        <TextField type={'search'} />
        <div className={s.likers}>{likersRender}</div>
      </div>
    </Modal>
  )
}

type Props = {
  follow: (data: { selectedUserId: number; username?: string }) => void
  onOpen: () => void
  open: boolean
  ownerId?: number
  postLikesData: PostLikesResponse | undefined
  unFollow: (data: { userId: number; username: string }) => void
  user: GetMeResponse | unknown
}
