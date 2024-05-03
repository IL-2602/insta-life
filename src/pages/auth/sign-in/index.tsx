import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { SignIn } from '@/widgets/auth/signIn'

const SignInPage = () => {
  return <SignIn.widget />
}

export default AuthRouteChecker(SignInPage)
SignInPage.getLayout = getBaseLayout
