import { useMemo, useState } from 'react'

import { useGetMyPaymentsQuery } from '@/services/profileService/profileEndpoints'
export const useContainer = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState<string>('10')
  const { data: myPaymentsData } = useGetMyPaymentsQuery()
  const totalCount = myPaymentsData?.length || 1
  const lastItem =
    totalCount > currentPage * +countPerPage - 1 ? currentPage * +countPerPage - 1 : totalCount - 1
  const myPayments = useMemo(() => {
    if (currentPage === 1) {
      return myPaymentsData?.slice(0, +countPerPage)
    }

    return myPaymentsData?.slice(lastItem, lastItem + +countPerPage - 1)
  }, [currentPage, countPerPage, totalCount])

  const changePageNumberHandler = (page: number) => setCurrentPage(page)
  const changePageSizeHandler = (size: string) => {
    setCurrentPage(1)
    setCountPerPage(size)
  }

  return {
    changePageNumberHandler,
    changePageSizeHandler,
    countPerPage,
    currentPage,
    myPayments,
    totalCount,
  }
}
