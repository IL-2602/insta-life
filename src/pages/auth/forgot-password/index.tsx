import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { ForgotPassword } from '@/widgets/auth/forgotPassword'

const ForgotPasswordPage = () => {
  return <ForgotPassword.widget />
}

export default AuthRouteChecker(ForgotPasswordPage)
ForgotPasswordPage.getLayout = getBaseLayout
