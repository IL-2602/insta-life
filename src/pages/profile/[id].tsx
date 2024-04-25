import { wrapper } from '@/app/store'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { api } from '@/services/api'
import { getMe } from '@/services/authService/authEndpoints'
import { getPublicUserProfile } from '@/services/publicProfileSerice/publicProfileEndpoints'
import { ProfileHeader } from '@/widgets/profile/profileHeader'

const PublicProfilePage = () => {
  return (
    <div>
      <ProfileHeader.widget />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const profileId = context.params?.id as string | undefined

  if (!profileId) {
    return { notFound: true }
  }

  store.dispatch(getMe.initiate(undefined))
  store.dispatch(getPublicUserProfile.initiate({ profileId: +profileId }))

  const allRes = await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return {
    props: {},
  }
})

PublicProfilePage.getLayout = getBaseLayout
export default PublicProfilePage
