import { wrapper } from '@/app/store'
import { AuthLayout } from '@/layouts/publ/AuthLayout'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { api } from '@/services/api'
import { getMe } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { getCurrentPost } from '@/services/postService/postEndpoints'
import { getPublicUserProfile, getUserPosts } from '@/services/publicService/publicEndpoints'
import { ProfileHeader } from '@/widgets/profile/profileHeader'
import { PostsList } from '@/widgets/profile/publ/postsList'

const PublicProfilePage = ({ isAuth }: Props) => {
  const content = (
    <div style={{ width: '100%' }}>
      <ProfileHeader.widget />
      <PostsList.widget />
    </div>
  )

  return isAuth ? <MainLayout>{content}</MainLayout> : <AuthLayout>{content}</AuthLayout>
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const profileId = context.params?.id as string | undefined
  const postId = context.query?.postId as string | undefined

  if (!profileId) {
    return { notFound: true }
  }

  if (postId) {
    const postResp = await store.dispatch(getCurrentPost.initiate(+postId))

    if (!postResp?.data) {
      return { notFound: true }
    }
  }

  const me = (await store.dispatch(getMe.initiate())) as { data: UserType }

  const profile = await store.dispatch(getPublicUserProfile.initiate({ profileId: +profileId }))

  if (!profile?.data) {
    return { notFound: true }
  }

  store.dispatch(getUserPosts.initiate({ pageSize: 12, userId: +profileId }))

  const allRes = await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return {
    props: { isAuth: !!me.data },
  }
})

type Props = {
  isAuth: boolean
}
export default PublicProfilePage
