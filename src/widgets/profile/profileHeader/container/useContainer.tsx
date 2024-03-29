import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'

export const useContainer = () => {
  const { data, isError, isLoading } = useGetProfileQuery()

  return { data, isError, isLoading }
}
