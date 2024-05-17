import { useTranslation } from '@/shared/hooks/useTranslation'
import { useGetSessionsQuery } from '@/services/devicesService/devicesEndpoints'

export const useContainer = () => {
  const { t } = useTranslation()

  const { data: sessions } = useGetSessionsQuery()
  console.log(sessions)
  return { t, sessions }
}
