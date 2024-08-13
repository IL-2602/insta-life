import { Typography } from '@/shared/ui/Typography'

import s from './PostDate.module.scss'

export const PostDate = ({ className, date }: Props) => {
  const formatedDate = new Date(date ?? '').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Typography className={`${s.date} ${className ?? ''} `} variant={'small'}>
      {formatedDate}
    </Typography>
  )
}

type Props = {
  className?: string
  date: string | undefined
}
