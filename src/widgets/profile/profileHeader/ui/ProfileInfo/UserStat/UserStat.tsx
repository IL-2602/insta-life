import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Typography } from '@/shared/ui/Typography'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './UserStats.module.scss'

export const UserStat = ({ count, isFollowLoading, title }: Props) => {
  return (
    <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
      <div className={s.statContainer}>
        <Typography as={'span'} variant={'bold14'}>
          {!isFollowLoading ? count || 0 : <Skeleton width={30} />}
        </Typography>
        <Typography as={'span'} variant={'regular14'}>
          {isFollowLoading ? <Skeleton width={70} /> : title}
        </Typography>
      </div>
    </SkeletonTheme>
  )
}
type Props = {
  count: number | undefined
  isFollowLoading?: boolean
  title: string
}
