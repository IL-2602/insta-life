import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { SignUp } from '@/widgets/auth/signUp'

const SignUpPage = () => {
  return <SignUp.widget />
}

export default AuthRouteChecker(SignUpPage)
SignUpPage.getLayout = getBaseLayout
