import { EditPost } from '../ui/EditPost'
import { useContainer } from './useContainer'

export const Container = () => <EditPost {...useContainer()} />

export type EditPostProps = ReturnType<typeof useContainer>
