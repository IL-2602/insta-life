import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { TermsOfService } from '@/widgets/auth/termsOfServices'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const TermsOfServicePage = () => {
  return <TermsOfService.widget />
}

TermsOfServicePage.getLayout = getBaseLayout
export default AuthRouteChecker(TermsOfServicePage)
