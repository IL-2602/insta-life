import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { Recovery } from '@/widgets/auth/recovery'

const RecoveryPage = () => {
  return <Recovery.widget />
}

export default AuthRouteChecker(RecoveryPage)
