import { CommentsAnswers } from '../ui/CommentsAnswers'
import { useContainer } from './useContainer'

export const Container = () => <CommentsAnswers {...useContainer()} />

export type CommentsAnswersProps = ReturnType<typeof useContainer>
