import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { ConfirmationLinkExpired } from '@/widgets/auth/confirmationLinkExpired'

const ConfirmationLinkExpiredPage = () => {
  return <ConfirmationLinkExpired.widget />
}

export default AuthRouteChecker(ConfirmationLinkExpiredPage)
ConfirmationLinkExpiredPage.getLayout = getBaseLayout
