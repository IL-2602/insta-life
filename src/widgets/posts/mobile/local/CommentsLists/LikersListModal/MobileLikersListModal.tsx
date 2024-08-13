import React from 'react'

import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './MobileLikersListModal.module.scss'

export const MobileLikersListModal = ({
  follow,
  onOpen,
  open,
  ownerId,
  postLikesData,
  unFollow,
}: Props) => {
  const likersRender = postLikesData?.items.map(el => {
    const isOwner = ownerId !== el.userId

    return (
      <div className={s.liker} key={el.id}>
        <div className={s.likerInfo}>
          <div className={s.photo}>
            <Avatar userAvatar={el.avatars[0]?.url} />
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
}
