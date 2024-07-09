import { useState } from 'react'

import { CommentsAnswers } from '@/services/commentsAnswersService/lib/commentsAnswersEndpoints.types'
import { useRouter } from 'next/router'

export const useContainer = ({
  comment,
  isComment,
}: {
  comment: CommentsAnswers
  isComment: boolean
}) => {
  const { locale } = useRouter()
  const [isAnswer, setIsAnswer] = useState(false)

  const onClickSetIsAnswer = () => setIsAnswer(true)

  return { comment, isAnswer, isComment, locale, onClickSetIsAnswer }
}
