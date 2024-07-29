import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { Comments } from '@/widgets/posts/mobile/local/Comments/ui/Comments'

import { useContainer } from './useContainer'

export const Container = ({
  comments,
  onOpen,
  open = false,
}: {
  comments?: CommentsAnswers[]
  onOpen: () => void
  open: boolean
}) => <Comments {...useContainer({ comments, onOpen, open })} />
export type CommentsType = ReturnType<typeof useContainer>
