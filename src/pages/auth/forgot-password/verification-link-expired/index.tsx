import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { EmailLinkExpired } from '@/widgets/auth/emailLinkExpired'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const VerificationLinkExpiredPage = () => {
  return <EmailLinkExpired.widget />
}

export default AuthRouteChecker(VerificationLinkExpiredPage)
VerificationLinkExpiredPage.getLayout = getBaseLayout
