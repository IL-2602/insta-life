import { ChangeEvent, useState } from 'react'

import { useGetUsersQuery } from '@/services/usersService/usersEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string | undefined>(undefined)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [cursor, setCursor] = useState<number>(0)

  const { data: users } = useGetUsersQuery({
    cursor,
    pageNumber,
    pageSize,
    search,
  })

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  return { handleSearchInput, search, t, users }
}
