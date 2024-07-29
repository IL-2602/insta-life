import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'

export const useContainer = ({
  comments,
  onOpen,
  open,
}: {
  comments?: CommentsAnswers[]
  onOpen: () => void
  open: boolean
}) => {
  return { comments, onOpen, open }
}
