import { wrapper } from '@/app/store'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { api } from '@/services/api'
import { getUserPosts } from '@/services/postService/postEndpoints'
import { getPublicUserProfile } from '@/services/publicProfileSerice/publicProfileEndpoints'
import { ProfileHeader } from '@/widgets/profile/profileHeader'
import { ProfilePhotos } from '@/widgets/profile/profilePhotos'
import { getMe } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { AuthLayout } from '@/layouts/publ/AuthLayout'

const PublicProfilePage = ({ isAuth }: Props) => {
  const content = (
    <div style={{ width: '100%' }}>
      <ProfileHeader.widget />
      <ProfilePhotos.widget />
    </div>
  )
  return isAuth ? <MainLayout>{content}</MainLayout> : <AuthLayout>{content}</AuthLayout>
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const profileId = context.params?.id as string | undefined

  if (!profileId) {
    return { notFound: true }
  }
  const me = (await store.dispatch(getMe.initiate())) as { data: UserType }
  store.dispatch(getPublicUserProfile.initiate({ profileId: +profileId }))
  store.dispatch(getUserPosts.initiate({ pageSize: 12, userId: +profileId }))
  const allRes = await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return {
    props: { isAuth: !!me },
  }
})

type Props = {
  isAuth: boolean
}
export default PublicProfilePage
