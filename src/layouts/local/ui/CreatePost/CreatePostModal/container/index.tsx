import { CreatePostModal } from '../ui/CreatePostModal'
import { useContainer } from './useContainer'

export const Container = () => <CreatePostModal {...useContainer()} />

export type CreatePostModalProps = ReturnType<typeof useContainer>
