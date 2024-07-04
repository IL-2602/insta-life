import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { Home } from '@/widgets/home/publ'

const HomePage = () => {
  return (
    <div>
      <Home.widget />
    </div>
  )
}

HomePage.getLayout = getBaseLayout
export default AuthDefender(HomePage)
