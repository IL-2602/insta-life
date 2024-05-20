import { useDispatch } from 'react-redux'

import { profileActions } from '@/services/profileService/store/slice/profileEndpoints.slice'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const { pathname, push } = useRouter()
  const dispatch = useDispatch()

  const isAuthPrivacyPolicy = pathname === ROUTES.AUTH_PRIVACY_POLICY

  const onBack = () => {
    isAuthPrivacyPolicy ? push(ROUTES.REGISTER) : dispatch(profileActions.setIsPrivacyPolicy(false))
  }

  return { isAuthPrivacyPolicy, onBack, t }
}
