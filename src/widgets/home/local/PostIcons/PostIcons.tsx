import { useState } from 'react'

import { ROUTES } from '@/shared/constants/routes'
import { useResize } from '@/shared/hooks/useResize'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/router'
import {
  PostBookmark,
  PostFillBookmark,
  PostFillHeart,
  PostHeart,
  PostMsg,
  PostPlane,
} from 'src/shared/assets/icons/Post'

import s from './PostIcons.module.scss'

export const PostIcons = ({ postId, userId }: Props) => {
  const [isLike, setIsLike] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)

  const handleTelegramShare = () => {
    const url = `https://instalife.fun/profile/${userId}?postId=${postId}`
    const message = `Look at my post 😍`
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(message)}`

    window.open(telegramLink)
  }

  const { width } = useResize()
  const router = useRouter()

  const scrollToTextArea = (id: number) => {
    const textArea = document.querySelector(`[data-id="postId-${id}"]`) as HTMLTextAreaElement

    if (width < 810) {
      void router.push(ROUTES.PROFILE)
    } else {
      setTimeout(() => {
        textArea.focus()
        textArea.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 0.5)
    }
  }

  const likePost = () => {
    setIsLike(!isLike)
  }

  const addToBookmark = () => {
    setIsBookmark(!isBookmark)
  }

  return (
    <div className={s.container}>
      <div className={s.groupIcons}>
        <Button className={s.btnIcon} onClick={likePost} variant={'noStyle'}>
          {!isLike ? <PostHeart /> : <PostFillHeart />}
        </Button>
        <Button className={s.btnIcon} onClick={() => scrollToTextArea(postId)} variant={'noStyle'}>
          <PostMsg />
        </Button>
        <Button className={s.btnIcon} onClick={handleTelegramShare} variant={'noStyle'}>
          <PostPlane />
        </Button>
      </div>
      <Button className={s.btnIcon} onClick={addToBookmark} variant={'noStyle'}>
        {!isBookmark ? <PostBookmark /> : <PostFillBookmark />}
      </Button>
    </div>
  )
}

type Props = {
  postId: number
  userId: number
}
