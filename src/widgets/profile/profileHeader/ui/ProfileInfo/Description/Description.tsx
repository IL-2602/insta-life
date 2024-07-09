import { Typography } from '@/shared/ui/Typography'

import s from './Description.module.scss'

export const Description = ({ text }: Props) => {
  return (
    <Typography className={s.text} variant={'regular16'}>
      {text}
    </Typography>
  )
}

type Props = {
  text?: string
}
