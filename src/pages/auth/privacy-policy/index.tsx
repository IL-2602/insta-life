import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { PrivacyPolicy } from '@/widgets/auth/privacyPolicy'

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy.widget />
}

PrivacyPolicyPage.getLayout = getBaseLayout
export default AuthRouteChecker(PrivacyPolicyPage)
