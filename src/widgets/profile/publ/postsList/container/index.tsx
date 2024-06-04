import { PostsList } from 'src/widgets/profile/publ/postsList/ui/PostsList'

import { useContainer } from './useContainer'

export const Container = () => <PostsList {...useContainer()} />

export type PostsListProps = ReturnType<typeof useContainer>
