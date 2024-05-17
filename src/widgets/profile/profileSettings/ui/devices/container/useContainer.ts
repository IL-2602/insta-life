import { useGetSessionsQuery } from '@/services/devicesService/devicesEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const { data: sessions, isLoading: isLoadingSessions } = useGetSessionsQuery()
  const isLoading = isLoadingSessions

  return { isLoading, sessions, t }
}
