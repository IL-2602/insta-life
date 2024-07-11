import { useCallback, useRef, useState } from 'react'

import { useGetAnswersQuery } from '@/services/commentsAnswersService/commentsAnswersEndpoints'

export const useContainer = (postId: number, commentId: number, answersCount: number) => {
  const [isOpen, setIsOpen] = useState<'Hide' | 'Open'>('Open')
  const [page, setPage] = useState<number>(1)
  const {
    data: answersData,
    isFetching: isFetchingAnswers,
    isLoading: isLoadingAnswers,
  } = useGetAnswersQuery(
    { commentId, pageNumber: page, pageSize: 8, postId },
    { skip: isOpen === 'Open' }
  )
  const answers = answersData?.items
  const answersTotalCount = answersCount
  const answersPageCount = answersData?.pagesCount || 1

  const cursorRef = useRef<IntersectionObserver | null>(null)
  const lastElRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingAnswers || isFetchingAnswers) {
        return
      }
      if (cursorRef.current) {
        cursorRef.current.disconnect()
      }
      cursorRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < answersPageCount) {
          setPage(p => p + 1)
        }
      })

      if (node) {
        cursorRef.current.observe(node)
      }
    },
    [isLoadingAnswers, page, isFetchingAnswers]
  )

  const onClickOpenCloseAnswerHandler = () => setIsOpen(isOpen === 'Hide' ? 'Open' : 'Hide')

  return {
    answers,
    answersTotalCount,
    isFetchingAnswers,
    isLoadingAnswers,
    isOpen,
    lastElRef,
    onClickOpenCloseAnswerHandler,
  }
}
