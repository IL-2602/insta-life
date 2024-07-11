import { CommentsList } from '../ui/CommentsList'
import { useContainer } from './useContainer'

export const Container = () => <CommentsList {...useContainer()} />

export type CommentsAnswersProps = ReturnType<typeof useContainer>
