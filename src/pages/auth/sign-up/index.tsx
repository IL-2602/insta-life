import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { SignUp } from '@/widgets/auth/signUp'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const SignUpPage = () => {
  return <SignUp.widget />
}

export default AuthRouteChecker(SignUpPage)
SignUpPage.getLayout = getBaseLayout
