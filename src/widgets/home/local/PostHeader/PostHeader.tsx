import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostHeader.module.scss'

import noAvatar from '../../../../../public/assets/noPhoto.svg'

export const PostHeader = ({ avatar, time, userName }: Props) => {
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
      <Button className={s.dots} variant={'noStyle'}>
        <HorizontalDots />
      </Button>
    </div>
  )
}

type Props = {
  avatar: string
  time: string
  userName: string
}
