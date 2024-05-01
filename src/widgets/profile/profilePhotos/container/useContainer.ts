import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetUserPostsQuery } from '@/services/publicService/publicEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { inView, ref } = useInView({
    threshold: 1,
  })
  const router = useRouter()

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)

  const { data: me } = useGetMeQuery() as { data: UserType }
  const { data: posts, isFetching } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 12 : 8,
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

  const handleReceivingPostId = (id: number) => {
    router.push({
      pathname: ROUTES.PROFILE,
      query: { id },
    })
  }

  return { handleReceivingPostId, isFetching, posts, ref }
}
