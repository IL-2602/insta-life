import { useState } from 'react'

import { useGetAnswersQuery } from '@/services/commentsAnswersService/commentsAnswersEndpoints'

export const useContainer = (postId: number, commentId: number, answersCount: number) => {
  const [isOpen, setIsOpen] = useState<'Hide' | 'Open'>('Open')
  const { data: answersData, isLoading: isLoadingAnswers } = useGetAnswersQuery(
    { commentId, postId },
    { skip: isOpen === 'Open' }
  )
  const answers = answersData?.items
  const answersTotalCount = answersData?.totalCount || answersCount

  const onClickOpenCloseAnswerHandler = () => setIsOpen(isOpen === 'Hide' ? 'Open' : 'Hide')

  return { answers, answersTotalCount, isLoadingAnswers, isOpen, onClickOpenCloseAnswerHandler }
}
