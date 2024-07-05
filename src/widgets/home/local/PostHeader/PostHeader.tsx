import { useState } from 'react'
import { toast } from 'react-toastify'

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

export const PostHeader = ({ avatar, time, userId, userName }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()

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

  return (
    <div className={s.container}>
      <div className={s.titleWrapper}>
        {avatar ? (
          <Image alt={'avatar'} className={s.avatar} height={36} src={avatar} width={36} />
        ) : (
          <div className={s.noAvatar}>
            <Image alt={'avatar'} height={24} src={noAvatar} width={24} />
          </div>
        )}

        <Typography variant={'h3'}>{userName}</Typography>
        <div className={s.point}></div>
        <Typography>
          <TimeDifference home postTime={time} />
        </Typography>
      </div>

      <div className={s.postOptions}>
        <CustomPopover
          contentChildren={<PostPopover handleCopyLink={handleCopyLink} />}
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
  userName: string
}
