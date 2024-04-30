import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { EmailLinkExpired } from '@/widgets/auth/emailLinkExpired'

const VerificationLinkExpiredPage = () => {
  return <EmailLinkExpired.widget />
}

export default AuthRouteChecker(VerificationLinkExpiredPage)
VerificationLinkExpiredPage.getLayout = getBaseLayout
