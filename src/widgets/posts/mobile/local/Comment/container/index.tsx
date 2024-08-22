import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { useContainer } from '@/widgets/posts/local/Comment/container/useContainer'

import { Comment } from '../ui/Comment'

export const Container = ({
  comment,
  isComment,
  lastRef,
}: {
  comment: CommentsAnswers
  isComment: boolean
  lastRef?: any
}) => <Comment ref={lastRef} {...useContainer({ comment, isComment })} />
