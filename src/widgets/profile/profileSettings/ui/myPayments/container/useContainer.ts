import { useGetMyPaymentsQuery } from '@/services/profileService/profileEndpoints'

export const useContainer = () => {
  const { data: myPayments } = useGetMyPaymentsQuery()

  return { myPayments }
}
