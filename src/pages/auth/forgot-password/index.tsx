import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { ForgotPassword } from '@/widgets/auth/forgotPassword'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const ForgotPasswordPage = () => {
  return <ForgotPassword.widget />
}

export default AuthRouteChecker(ForgotPasswordPage)
ForgotPasswordPage.getLayout = getBaseLayout
