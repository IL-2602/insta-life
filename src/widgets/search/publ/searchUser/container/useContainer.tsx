import { ChangeEvent, useState } from 'react'

import { useGetUserQuery } from '@/services/usersService/usersEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string | undefined>(undefined)

  const { data: users } = useGetUserQuery({
    search,
  })

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  return { handleSearchInput, search, t, users }
}
