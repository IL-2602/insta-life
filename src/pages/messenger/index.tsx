import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const Messenger = () => {
  return <div>Messenger</div>
}

Messenger.getLayout = getBaseLayout
export default AuthDefender(Messenger)
