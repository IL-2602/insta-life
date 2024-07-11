import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

import { Comment } from '../ui/Comment'
import { useContainer } from './useContainer'

export const Container = ({
  comment,
  isComment,
  lastRef,
}: {
  comment: CommentsAnswers
  isComment: boolean
  lastRef?: any
}) => <Comment ref={lastRef} {...useContainer({ comment, isComment })} />

export type CommentProps = ReturnType<typeof useContainer>
