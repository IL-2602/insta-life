import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetUserPostsQuery } from '@/services/publicService/publicEndpoints'

export const useContainer = () => {
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const { data: me } = useGetMeQuery() as { data: UserType }

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)

  const { data: posts, isFetching } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 4 : 2,
    userId: me.userId,
  })

  useEffect(() => {
    if (posts && posts.items.length >= posts.totalCount) {
      return
    }

    if (inView && posts && posts.items.length > 0) {
      setLastPostId(posts.items[posts.items.length - 1].id)
    }
  }, [inView])

  return { isFetching, posts, ref }
}
