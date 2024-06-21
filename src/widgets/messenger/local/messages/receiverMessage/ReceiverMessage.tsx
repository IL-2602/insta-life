import { Typography } from '@/shared/ui/Typography'

import s from './ReceiverMessage.module.scss'
export const ReceiverMessage = ({}: Props) => {
  return (
    <div className={s.root}>
      <div className={s.avatar}></div>
      <div className={s.textWrapper}>
        <Typography variant={'regular14'}>Hi! How are youa?</Typography>
        <Typography color={'form'} variant={'small'}>
          14:46
        </Typography>
      </div>
    </div>
  )
}
type Props = {}
