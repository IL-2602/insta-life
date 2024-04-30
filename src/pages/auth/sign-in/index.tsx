import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { SignIn } from '@/widgets/auth/signIn'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const SignInPage = () => {
  return <SignIn.widget />
}

export default AuthRouteChecker(SignInPage)
SignInPage.getLayout = getBaseLayout
