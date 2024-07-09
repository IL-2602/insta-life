import { AnswerList } from '../ui/AnswerList'
import { useContainer } from './useContainer'

export const Container = (postId: number, commentId: number, answerCount: number) => (
  <AnswerList {...useContainer(postId, commentId, answerCount)} />
)

export type AnswersListProps = ReturnType<typeof useContainer>
