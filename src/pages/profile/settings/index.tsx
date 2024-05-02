import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { ProfileSettings } from '@/widgets/profile/profileSettings'

const ProfileSettingsPage = () => {
  return <ProfileSettings.widget />
}

export default AuthDefender(ProfileSettingsPage)
ProfileSettingsPage.getLayout = getBaseLayout
