import { PostPublication } from '../ui/PostPublication'
import { useContainer } from './useContainer'

export const Container = () => <PostPublication {...useContainer()} />

export type PostPublicationProps = ReturnType<typeof useContainer>
