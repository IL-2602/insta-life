import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  useGetUserInfoQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
} from '@/services/usersService/usersEndpoints'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { Typography } from '@/shared/ui/Typography'
import { PostPopover } from '@/widgets/home/local/PostHeader/PostPopover/PostPopover'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostHeader.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostHeader = ({ avatar, time, userId, username }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()

  const [subscribe] = useSubscribeMutation()
  const [unSubscribe] = useUnSubscribeMutation()

  const handleCopyLink = () => {
    const url = `https://instalife.fun/profile/${userId}`

    navigator.clipboard.writeText(url).then(() => {
      toast.success(t.button.linkSuccess, {
        pauseOnHover: false,
        style: {
          background: '#0A6638',
          border: '1px solid #14CC70',
          color: 'white',
          fontSize: '14px',
        },
      })

      setIsOpenPopover(false)
    })
  }

  const subscribeToUser = async () => {
    toast.success(t.post.followSuccess, {
      pauseOnHover: false,
      style: {
        background: '#0A6638',
        border: '1px solid #14CC70',
        color: 'white',
        fontSize: '14px',
      },
    })

    setIsOpenPopover(false)

    await subscribe({ selectedUserId: userId, username })
  }

  const unSubscribeToUser = async () => {
    toast.success(t.post.unfollowSuccess, {
      pauseOnHover: false,
      style: {
        background: '#0A6638',
        border: '1px solid #14CC70',
        color: 'white',
        fontSize: '14px',
      },
    })

    setIsOpenPopover(false)

    await unSubscribe({ userId: userId, username })
  }

  const { data: userInfo } = useGetUserInfoQuery({
    username,
  })

  const isFollowing = userInfo?.isFollowing

  return (
    <div className={s.container}>
      <div className={s.titleWrapper}>
        {avatar ? (
          <Image alt={'avatar'} className={s.avatar} height={36} src={avatar} width={36} />
        ) : (
          <div className={s.noAvatar}>
            <Image alt={'avatar'} height={22} src={noAvatar} width={22} />
          </div>
        )}

        <Typography className={s.userName} variant={'h3'}>
          {username}
        </Typography>
        <div className={s.point}></div>
        <Typography className={s.time}>
          <TimeDifference home postTime={time} />
        </Typography>
      </div>

      <div className={s.postOptions}>
        <CustomPopover
          contentChildren={
            <PostPopover
              handleCopyLink={handleCopyLink}
              isFollowing={isFollowing}
              subscribeToUser={subscribeToUser}
              unSubscribeToUser={unSubscribeToUser}
            />
          }
          icon={
            <Button className={clsx(s.dots, isOpenPopover ? s.dotsActive : '')} variant={'noStyle'}>
              <HorizontalDots />
            </Button>
          }
          onOpenChange={() => setIsOpenPopover(!isOpenPopover)}
          open={isOpenPopover}
        />
      </div>
    </div>
  )
}

type Props = {
  avatar: string
  time: string
  userId: number
  username: string
}
