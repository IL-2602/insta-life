import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const HomePage = () => {
  return <div>Home</div>
}

HomePage.getLayout = getBaseLayout
export default AuthDefender(HomePage)
