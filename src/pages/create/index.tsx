import { PostCropping } from '@/layouts/local/ui/CreatePost/PostCropping'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'

const CreatePage = () => {
  return (
    <div>
      <PostCropping.widget />
    </div>
  )
}

CreatePage.getLayout = getBaseLayout
export default CreatePage
