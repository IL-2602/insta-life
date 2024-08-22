import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { Comments } from '@/widgets/posts/mobile/local/Comments/ui/Comments'

import { useContainer } from './useContainer'

export const Container = ({
  comments,
  isFetchingComments,
  lastRef,
  onOpen,
  open = false,
}: {
  comments?: CommentsAnswers[]
  isFetchingComments: boolean
  lastRef?: any
  onOpen: () => void
  open: boolean
}) => <Comments ref={lastRef} {...useContainer({ comments, isFetchingComments, onOpen, open })} />
export type CommentsType = ReturnType<typeof useContainer>
