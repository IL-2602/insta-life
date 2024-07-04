import { PostModal } from '@/widgets/posts/publ/ui/PostModal'

import { useContainer } from './useContainer'

export const Container = () => <PostModal {...useContainer()} />

export type PostModalProps = ReturnType<typeof useContainer>
