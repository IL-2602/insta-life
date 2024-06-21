import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { Messenger } from '@/widgets/messenger/public'

const MessengerPage = () => {
  return <Messenger.widget />
}

MessengerPage.getLayout = getBaseLayout
export default AuthDefender(MessengerPage)
