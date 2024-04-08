import { PhotoFilter } from '@/widgets/create/PhotoFilter/ui'

import { useContainer } from './useContainer'

export const Container = () => <PhotoFilter {...useContainer()} />
export type PhotoFilterProps = ReturnType<typeof useContainer>
