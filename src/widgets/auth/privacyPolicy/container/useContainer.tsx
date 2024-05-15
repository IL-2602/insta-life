import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const { pathname, push } = useRouter()

  const isAuthPrivacyPolicy = pathname === ROUTES.AUTH_PRIVACY_POLICY

  const onBack = () => {
    isAuthPrivacyPolicy ? push(ROUTES.REGISTER) : push(ROUTES.PROFILE_SETTINGS)
  }

  return { isAuthPrivacyPolicy, onBack, t }
}
