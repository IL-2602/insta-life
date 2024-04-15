import { useEffect } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { authActions } from '@/services/authService/store/slice/authEndpoints.slice'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import { useRouter } from 'next/router'

const GitHubPage = () => {
  const { isReady, push, query } = useRouter()
  const dispatch = useAppDispatch()

  if (query.accessToken && query.email) {
    dispatch(authActions.setAccessToken(query.accessToken as string))
    dispatch(authActions.setEmail(query.email as string))
  }

  useEffect(() => {
    if (!isReady) {
      return
    }
    if (query.accessToken) {
      void push(ROUTES.PROFILE)
    } else {
      void push(ROUTES.LOGIN)
    }
  }, [query.accessToken, push, dispatch, isReady])

  return (
    <div>
      <Spinner />
    </div>
  )
}

GitHubPage.getLayout = getBaseLayout
export default GitHubPage
