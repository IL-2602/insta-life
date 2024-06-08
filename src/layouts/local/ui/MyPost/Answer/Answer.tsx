import { Comment } from '@/layouts/local/ui/MyPost/Comment/Comment'

export const Answer = ({
  answerCommentTextHandler,
  answers,
  changeIsLikedStatus,
  sendAnswerComment,
}: Props) => {
  return (
    <>
      <Comment
        answerCommentSend={sendAnswerComment}
        answerCommentTextHandler={answerCommentTextHandler}
        answers={answers}
        changeIsLikedStatus={changeIsLikedStatus}
      />
    </>
  )
}

type Props = {
  answerCommentTextHandler: (answerText: string) => void
  answers?: string
  changeIsLikedStatus: (commentId: number, isLiked: string, postId: number) => void
  sendAnswerComment?: (postId: number, commentId: number) => void
}
