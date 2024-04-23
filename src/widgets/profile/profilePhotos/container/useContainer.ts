import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { useGetUserPostsQuery } from '@/services/postService/postEndpoints'
import { profileActions } from '@/services/profileService/store/slice/profileEndpoints.slice'

export const useContainer = () => {
  const dispatch = useAppDispatch()
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const profilePosts = useAppSelector(state => state.profileReducer.profilePosts)
  // const lastPostId = useAppSelector(state => state.profileReducer.lastPostId)
  const [lastPostId, setLastPostId] = useState<number | undefined>(undefined)

  const { data: me } = useGetMeQuery() as { data: UserType }
  const { data: posts, isFetching } = useGetUserPostsQuery({
    endCursorPostId: lastPostId,
    pageSize: !lastPostId ? 12 : 8,
    userId: me.userId,
  })

  // useEffect(() => {
  //   if (posts && posts.items.length > 0) {
  //     dispatch(profileActions.setProfilePosts(posts.items))
  //   }
  // }, [dispatch, posts])

  useEffect(() => {
    if (inView && posts && posts.items.length > 0) {
      setLastPostId(posts.items[posts.items.length - 1].id)
    }
  }, [inView])

  // useEffect(() => {
  //   if (posts && profilePosts.length >= posts.totalCount) {
  //     return
  //   }
  //
  //   if (inView && profilePosts.length > 0) {
  //     dispatch(profileActions.setLastPostId(profilePosts[profilePosts.length - 1].id))
  //   }
  // }, [inView])

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     dispatch(profileActions.setClearProfilePosts())
  //   }
  //
  //   router.events.on('routeChangeStart', handleRouteChange)
  //
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  const handleReceivingPostId = (id: number) => {
    dispatch(profileActions.setPostId(id))
  }

  return { handleReceivingPostId, isFetching, posts, profilePosts, ref }
}
