import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetUserPostsQuery } from '@/services/publicService/publicEndpoints'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const { query, replace } = useRouter()

  const profileId = query.id as string

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)

  const { data: posts, isFetching } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 12 : 8,
    userId: +profileId,
  })

  const dispatch = useAppDispatch()

  const [width, setWidth] = useState<number>(1024)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  useEffect(() => {
    if (posts && posts.items.length >= posts.totalCount) {
      return
    }

    if (inView && posts && posts.items.length > 0) {
      setLastPostId(posts.items[posts.items.length - 1].id)
    }
  }, [inView])

  const handleReceivingPostId = (id: number) => {
    void replace({ query: { id: query.id, postId: id } }, undefined, {
      shallow: true,
    })

    dispatch(postActions.setIsMyPostModal(true))
  }

  return { handleReceivingPostId, isFetching, isMobile, lastPostId, posts, ref }
}
