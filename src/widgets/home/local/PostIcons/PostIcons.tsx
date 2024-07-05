import { Button } from '@/shared/ui/Button'
import { PostBookmark, PostHeart, PostMsg, PostPlane } from 'src/shared/assets/icons/Post'

import s from './PostIcons.module.scss'

export const PostIcons = ({ postId, userId }: Props) => {
  const handleTelegramShare = () => {
    const url = `https://instalife.fun/profile/${userId}?postId=${postId}`
    const message = `Look at my post 😍`
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(message)}`

    window.open(telegramLink)
  }

  return (
    <div className={s.container}>
      <div className={s.groupIcons}>
        <Button className={s.btnIcon} variant={'noStyle'}>
          <PostHeart />
        </Button>
        <Button className={s.btnIcon} variant={'noStyle'}>
          <PostMsg />
        </Button>
        <Button className={s.btnIcon} onClick={handleTelegramShare} variant={'noStyle'}>
          <PostPlane />
        </Button>
      </div>
      <Button className={s.btnIcon} variant={'noStyle'}>
        <PostBookmark />
      </Button>
    </div>
  )
}

type Props = {
  postId: number
  userId: number
}
