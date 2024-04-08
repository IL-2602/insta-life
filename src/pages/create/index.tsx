import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { PhotoFilter } from '@/widgets/create/PhotoFilter'

const CreatePage = () => {
  return <PhotoFilter.widget />
}

CreatePage.getLayout = getBaseLayout
export default CreatePage
