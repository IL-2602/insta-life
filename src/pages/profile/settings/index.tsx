import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { ProfileSettings } from '@/widgets/profile/profileSettings'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const ProfileSettingsPage = () => {
  return <ProfileSettings.widget />
}

export default AuthDefender(ProfileSettingsPage)
ProfileSettingsPage.getLayout = getBaseLayout
