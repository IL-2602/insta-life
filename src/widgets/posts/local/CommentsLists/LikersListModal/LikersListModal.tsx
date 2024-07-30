import React from 'react'

import { PostLikesResponse } from '@/services/postService/lib/postEndpoints.types'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './LikersListModal.module.scss'

export const LikersListModal = ({ onOpen, open, postLikesData }: Props) => {
  const likersRender = postLikesData?.items.map(el => {
    return (
      <div className={s.liker} key={el.id}>
        <div className={s.likerInfo}>
          <Image
            alt={el.avatars[0].url}
            height={el.avatars[0].height / 5}
            key={el.id}
            src={el.avatars[0].url}
            style={{ borderRadius: '50%' }}
            width={el.avatars[0].width / 5}
          />
          <Typography variant={'regular16'}>{el.userName}</Typography>
        </div>
        {el.isFollowing ? <Button variant={'outlined'}>Unfollow</Button> : <Button>Follow</Button>}
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
  onOpen: () => void
  open: boolean
  postLikesData: PostLikesResponse | undefined
}
