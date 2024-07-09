import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { SearchUser } from '@/widgets/search/publ/searchUser'

const SearchPage = () => {
  return (
    <div>
      <SearchUser.widget />
    </div>
  )
}

SearchPage.getLayout = getBaseLayout
export default AuthDefender(SearchPage)
