import { Recovery } from '@/widgets/auth/recovery'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'

const RecoveryPage = () => {
  return <Recovery.widget />
}

export default AuthRouteChecker(RecoveryPage)
