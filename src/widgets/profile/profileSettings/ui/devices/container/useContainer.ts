import { useGetSessionsQuery } from '@/services/devicesService/devicesEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const { data: sessions } = useGetSessionsQuery()

  console.log(sessions)

  return { sessions, t }
}
