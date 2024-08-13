import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

export const useContainer = ({
  comments,
  isFetchingComments,
  onOpen,
  open,
}: {
  comments?: CommentsAnswers[]
  isFetchingComments: boolean
  onOpen: () => void
  open: boolean
}) => {
  return { comments, isFetchingComments, onOpen, open }
}
