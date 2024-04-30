import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { RegistrationConfirmation } from '@/widgets/auth/registrationConfirmation'

const RegistrationConfirmationPage = () => {
  return <RegistrationConfirmation.widget />
}

export default AuthRouteChecker(RegistrationConfirmationPage)
