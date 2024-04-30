import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { SignUpConfirmation } from '@/widgets/auth/signUpConfirmation'

const SignUpConfirmationPage = () => {
  return <SignUpConfirmation.widget />
}

export default AuthRouteChecker(SignUpConfirmationPage)
SignUpConfirmationPage.getLayout = getBaseLayout
