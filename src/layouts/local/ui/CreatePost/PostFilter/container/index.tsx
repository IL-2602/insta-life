import { PostFilter } from '@/layouts/local/ui/CreatePost/PostFilter/ui'

import { useContainer } from './useContainer'

export const Container = () => <PostFilter {...useContainer()} />
export type PostFilterProps = ReturnType<typeof useContainer>
