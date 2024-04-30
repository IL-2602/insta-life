import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const SearchPage = () => {
  return <div>Search</div>
}

SearchPage.getLayout = getBaseLayout
export default AuthDefender(SearchPage)
