import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { ConfirmationLinkExpired } from '@/widgets/auth/confirmationLinkExpired'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const ConfirmationLinkExpiredPage = () => {
  return <ConfirmationLinkExpired.widget />
}

export default AuthRouteChecker(ConfirmationLinkExpiredPage)
ConfirmationLinkExpiredPage.getLayout = getBaseLayout
