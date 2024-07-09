import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

import { Comment } from '../ui/Comment'
import { useContainer } from './useContainer'

export const Container = ({
  comment,
  isComment,
}: {
  comment: CommentsAnswers
  isComment: boolean
}) => <Comment {...useContainer({ comment, isComment })} />

export type CommentProps = ReturnType<typeof useContainer>
