import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { ProfileHeader } from '@/widgets/profile/profileHeader'
import { ProfilePhotos } from '@/widgets/profile/profilePhotos'

const ProfilePage = () => {
  return (
    <div>
      <ProfileHeader.widget />
      <ProfilePhotos.widget />
    </div>
  )
}

ProfilePage.getLayout = getBaseLayout
export default ProfilePage
