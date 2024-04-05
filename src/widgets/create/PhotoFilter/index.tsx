import { mockPhotoData } from '@/widgets/create/PhotoFilter/mockPhotoData'
import { PhotoFilter } from '@/widgets/create/PhotoFilter/ui/PhotoFilter'

export const PhotoFilterContainer = () => {
  return <PhotoFilter images={mockPhotoData} />
}
