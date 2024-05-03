import { PublicPosts } from '../ui/PublicPosts'
import { useContainer } from './useContainer'

export const Container = () => <PublicPosts {...useContainer()} />

export type PublicPostsProps = ReturnType<typeof useContainer>
