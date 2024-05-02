import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'

const FavoritesPage = () => {
  return <div>Favorites</div>
}

FavoritesPage.getLayout = getBaseLayout
export default AuthDefender(FavoritesPage)
