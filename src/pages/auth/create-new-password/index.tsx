import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { CreateNewPassword } from '@/widgets/auth/createNewPassword'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword.widget />
}

export default AuthRouteChecker(CreateNewPasswordPage)
CreateNewPasswordPage.getLayout = getBaseLayout
