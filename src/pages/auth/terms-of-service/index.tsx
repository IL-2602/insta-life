import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { TermsOfService } from '@/widgets/auth/termsOfServices'

const TermsOfServicePage = () => {
  return <TermsOfService.widget />
}

TermsOfServicePage.getLayout = getBaseLayout
export default AuthRouteChecker(TermsOfServicePage)
