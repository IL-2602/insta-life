import { useEffect, useState } from 'react'

import { useUpdatePostLikeMutation } from '@/services/likesService/likesEndpoints'
import { useGetPostsQuery } from '@/services/postService/postEndpoints'
import { useGetUserPostsQuery } from '@/services/publicService/publicEndpoints'
import { useResize } from '@/shared/hooks/useResize'
import { Button } from '@/shared/ui/Button'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import saveToLocalStorage from '@/shared/utils/localStorage/saveToLocalStorage'
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

export const PostIcons = ({ postId, userId, username }: Props) => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const [isBookmark, setIsBookmark] = useState(false)

  const { width } = useResize()
  const router = useRouter()

  const [updatePostLike] = useUpdatePostLikeMutation()

  const likePost = () => {
    setIsLike(!isLike)
    if (isLike) {
      updatePostLike({ likeStatus: 'DISLIKE', postId })
    } else {
      updatePostLike({ likeStatus: 'LIKE', postId })
    }
  }

  const addToBookmark = () => {
    setIsBookmark(!isBookmark)
  }

  const handleTelegramShare = () => {
    const url = `https://instalife.fun/profile/${userId}?postId=${postId}`
    const message = `Look at my post 😍`
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(message)}`

    window.open(telegramLink)
  }

  const scrollToTextArea = (id: number) => {
    const textArea = document.querySelector(`[data-id="postId-${id}"]`) as HTMLTextAreaElement

    setTimeout(() => {
      textArea.focus()
      textArea.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 0.5)
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
  username: string
}
