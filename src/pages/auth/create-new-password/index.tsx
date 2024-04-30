import { getBaseLayout } from '@/layouts/publ/BaseLayout'
import { CreateNewPassword } from '@/widgets/auth/createNewPassword'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword.widget />
}

export default AuthRouteChecker(CreateNewPasswordPage)
CreateNewPasswordPage.getLayout = getBaseLayout
