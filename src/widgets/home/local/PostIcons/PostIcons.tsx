import { Button } from '@/shared/ui/Button'
import { PostBookmark, PostHeart, PostMsg, PostPlane } from 'src/shared/assets/icons/Post'

import s from './PostIcons.module.scss'

export const PostIcons = ({}: Props) => {
  return (
    <div className={s.container}>
      <div className={s.groupIcons}>
        <Button className={s.btnIcon} variant={'noStyle'}>
          <PostHeart />
        </Button>
        <Button className={s.btnIcon} variant={'noStyle'}>
          <PostMsg />
        </Button>
        <Button className={s.btnIcon} variant={'noStyle'}>
          <PostPlane />
        </Button>
      </div>
      <Button className={s.btnIcon} variant={'noStyle'}>
        <PostBookmark />
      </Button>
    </div>
  )
}

type Props = {}
