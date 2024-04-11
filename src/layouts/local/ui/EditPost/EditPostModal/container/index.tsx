import { EditPostModal } from '../ui/EditPostModal'
import { useContainer } from './useContainer'

export const Container = () => <EditPostModal {...useContainer()} />

export type EditPostModalProps = ReturnType<typeof useContainer>
