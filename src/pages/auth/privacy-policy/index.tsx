import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { PrivacyPolicy } from '@/widgets/auth/privacyPolicy'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy.widget />
}

PrivacyPolicyPage.getLayout = getBaseLayout
export default AuthRouteChecker(PrivacyPolicyPage)
