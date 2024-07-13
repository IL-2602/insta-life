import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetHomePostsQuery } from '@/services/publicService/publicEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const { t } = useTranslation()

  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)

  const {
    data: posts,
    isFetching,
    isLoading: isInitialLoading,
  } = useGetHomePostsQuery({ endCursorPostId: lastPostId, pageSize: !lastPostId ? 4 : 3 })

  useEffect(() => {
    if (posts && posts.items.length >= posts.totalCount) {
      return
    }

    if (inView && posts && posts.items.length > 0) {
      setLastPostId(posts.items[posts.items.length - 1].id)
    }
  }, [inView])

  return { isFetching, isInitialLoading, posts, ref, t }
}
