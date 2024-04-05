import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { PhotoFilterContainer } from '@/widgets/create/PhotoFilter'

const CreatePage = () => {
  return <PhotoFilterContainer />
}

CreatePage.getLayout = getBaseLayout
export default CreatePage
