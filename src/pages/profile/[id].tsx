import { wrapper } from '@/app/store'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { api } from '@/services/api'
import { getMe } from '@/services/authService/authEndpoints'
import { getUserPosts } from '@/services/postService/postEndpoints'
import { getPublicUserProfile } from '@/services/publicProfileSerice/publicProfileEndpoints'
import { ProfileHeader } from '@/widgets/profile/profileHeader'
import { ProfilePhotos } from '@/widgets/profile/profilePhotos'

const PublicProfilePage = () => {
  return (
    <div style={{ width: '100%' }}>
      <ProfileHeader.widget />
      <ProfilePhotos.widget />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const profileId = context.params?.id as string | undefined
  const cookie = context.req?.cookies

  if (!profileId) {
    return { notFound: true }
  }

  store.dispatch(getPublicUserProfile.initiate({ profileId: +profileId }))
  store.dispatch(getUserPosts.initiate({ pageSize: 12, userId: +profileId }))
  const allRes = await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return {
    props: { cookie },
  }
})

PublicProfilePage.getLayout = getBaseLayout
export default PublicProfilePage
