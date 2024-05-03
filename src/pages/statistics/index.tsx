import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const StatisticsPage = () => {
  return <div>Statistics</div>
}

StatisticsPage.getLayout = getBaseLayout
export default AuthDefender(StatisticsPage)
