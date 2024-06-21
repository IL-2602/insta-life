import { Typography } from '@/shared/ui/Typography'

import s from './OwnerMessage.module.scss'
export const OwnerMessage = () => {
  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <Typography variant={'regular14'}>Did you go into space yesterday? :D</Typography>
        <Typography color={'primary'} variant={'small'}>
          14:53
        </Typography>
      </div>
    </div>
  )
}
