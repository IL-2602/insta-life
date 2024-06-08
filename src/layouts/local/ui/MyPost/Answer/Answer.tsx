import { Comment } from '@/layouts/local/ui/MyPost/Comment/Comment'

export const Answer = ({
  answerCommentTextHandler,
  answers,
  changeIsLikedStatus,
  sendAnswerComment,
  setCreateAnswer,
}: Props) => {
  return (
    <>
      {answers.map((answer: any) => {
        return (
          <Comment
            answerCommentSend={sendAnswerComment}
            answerCommentTextHandler={answerCommentTextHandler}
            answers={answers}
            changeIsLikedStatus={changeIsLikedStatus}
            commentId={answer.commentId}
            createdAt={answer.createdAt}
            key={answer.id}
            postId={answer.postId}
            setCreateAnswer={setCreateAnswer}
            uAvatar={answer.from.avatars[0].url}
            uComment={answer.content}
            uId={answer.from.id}
            uIsLiked={answer.isLiked}
            uLikesCount={answer.likeCount}
            uName={answer.from.username}
          />
        )
      })}
    </>
  )
}

type Props = {
  answerCommentTextHandler: (answerText: string) => void
  answers?: any
  changeIsLikedStatus: (commentId: number, isLiked: string, postId: number) => void
  sendAnswerComment?: (postId: number, commentId: number) => void
  setCreateAnswer: (value: boolean, commentId: number) => void
}
