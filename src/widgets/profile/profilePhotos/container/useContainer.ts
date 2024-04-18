import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetUserPostsQuery } from '@/services/postService/postEndpoints'

export const useContainer = () => {
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)
  const [photos, setPhotos] = useState<string[]>([])
  const [postIds, setPostIds] = useState<number[]>([])

  const { data: me } = useGetMeQuery() as { data: UserType }

  const { data: user, isFetching } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 12 : 8,
    userId: me.userId,
  })

  useEffect(() => {
    if (user) {
      const ids = user.items.map(item => item.id)
      const images = user.items.map(item => item.images[0].url)

      setPhotos(prev => [...prev, ...images])
      setPostIds(ids)
    }
  }, [user])

  useEffect(() => {
    if (inView && postIds.length > 0) {
      setLastPostId(postIds[0] - 8)
    }
  }, [inView])

  return { isFetching, photos, ref }
}
