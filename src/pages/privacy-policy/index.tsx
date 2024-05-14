import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { PrivacyPolicy } from '@/widgets/auth/privacyPolicy'

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy.widget />
}

PrivacyPolicyPage.getLayout = getBaseLayout
export default PrivacyPolicyPage
