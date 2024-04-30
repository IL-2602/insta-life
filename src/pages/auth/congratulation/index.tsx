import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { SignUpConfirmation } from '@/widgets/auth/signUpConfirmation'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const SignUpConfirmationPage = () => {
  return <SignUpConfirmation.widget />
}

export default AuthRouteChecker(SignUpConfirmationPage)
SignUpConfirmationPage.getLayout = getBaseLayout
