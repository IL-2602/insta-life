import { useContainer } from '@/layouts/local/ui/CreatePost/PostCropping/container/useContainer'

import { PostCropping } from '../ui/PostCropping'

export const Container = () => <PostCropping {...useContainer()} />

export type Props = ReturnType<typeof useContainer>
