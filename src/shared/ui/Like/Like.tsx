import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Heart } from '@/shared/assets/icons/Heart'
import HeartRed from '@/shared/assets/icons/Heart/HeartRed'
import { clsx } from 'clsx'

import s from './Like.module.scss'

export type LikeProps = {
  uIsLiked: boolean
} & ComponentPropsWithoutRef<'div'>

export const Like = forwardRef<HTMLDivElement, LikeProps>(
  ({ className, uIsLiked, ...restProps }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
    }

    return (
      <div className={classNames.root} ref={ref} {...restProps}>
        {uIsLiked ? <HeartRed /> : <Heart />}
      </div>
    )
  }
)
