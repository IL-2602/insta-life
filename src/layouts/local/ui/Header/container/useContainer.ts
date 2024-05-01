import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isAuthPath = router.pathname.startsWith(ROUTES.AUTH)
  const { data: me, isLoading } = useGetMeQuery(undefined, { skip: isAuthPath })

  const toSignUp = () => {
    router.push(ROUTES.REGISTER)
  }

  const toSignIn = () => {
    router.push(ROUTES.LOGIN)
  }

  return { isLoading, me, router, t, toSignIn, toSignUp }
}
