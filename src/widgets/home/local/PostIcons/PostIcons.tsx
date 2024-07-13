import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import {
  useLazyGetPostLikesQuery,
  useUpdatePostLikeMutation,
} from '@/services/likesService/likesEndpoints'
import { likesActions } from '@/services/likesService/store/slice/likesEndpoints.slice'
import { Button } from '@/shared/ui/Button'
import {
  PostBookmark,
  PostFillBookmark,
  PostFillHeart,
  PostHeart,
  PostMsg,
  PostPlane,
} from 'src/shared/assets/icons/Post'

import s from './PostIcons.module.scss'

export const PostIcons = ({ description, isLiked, postId, userId }: Props) => {
  const [isBookmark, setIsBookmark] = useState(false)
  const dispatch = useAppDispatch()

  const [updatePostLike] = useUpdatePostLikeMutation()
  const [getPostLikes] = useLazyGetPostLikesQuery()

  const likePost = async () => {
    dispatch(likesActions.setIsPostLikeLoading(true))

    try {
      await updatePostLike({ likeStatus: 'LIKE', postId })
      await getPostLikes({ postId })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(likesActions.setIsPostLikeLoading(false))
    }
  }

  const dislikePost = async () => {
    dispatch(likesActions.setIsPostLikeLoading(true))

    try {
      await updatePostLike({ likeStatus: 'DISLIKE', postId })
      await getPostLikes({ postId })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(likesActions.setIsPostLikeLoading(false))
    }
  }

  const addToBookmark = () => {
    setIsBookmark(!isBookmark)
  }

  const handleTelegramShare = () => {
    const url = `https://instalife.fun/profile/${userId}?postId=${postId}`
    const message = description || `Look at my post 😍`
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(message)}`

    window.open(telegramLink)
  }

  const scrollToTextArea = (id: number) => {
    const textArea = document.querySelector(`[data-id="postId-${id}"]`) as HTMLTextAreaElement

    if (!textArea) {
      return
    }

    const targetPosition = textArea.getBoundingClientRect().top + window.pageYOffset
    const windowHeight = window.innerHeight
    const targetScrollPosition = targetPosition - windowHeight / 2 + textArea.offsetHeight / 2
    const startPosition = window.pageYOffset
    const distance = targetScrollPosition - startPosition
    const duration = 600 // Длительность анимации в миллисекундах
    let startTime: null | number = null

    const smoothScroll = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1) // Прогресс от 0 до 1

      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress))

      if (elapsedTime < duration) {
        requestAnimationFrame(smoothScroll)
      } else {
        textArea.focus()
      }
    }

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    requestAnimationFrame(smoothScroll)
  }

  return (
    <div className={s.container}>
      <div className={s.groupIcons}>
        <Button
          className={s.btnIcon}
          onClick={isLiked ? dislikePost : likePost}
          variant={'noStyle'}
        >
          {!isLiked ? <PostHeart /> : <PostFillHeart />}
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
  description: string
  isLiked: boolean
  postId: number
  userId: number
}
