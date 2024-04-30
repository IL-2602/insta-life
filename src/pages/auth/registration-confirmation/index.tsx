import { RegistrationConfirmation } from '@/widgets/auth/registrationConfirmation'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const RegistrationConfirmationPage = () => {
  return <RegistrationConfirmation.widget />
}

export default AuthRouteChecker(RegistrationConfirmationPage)
