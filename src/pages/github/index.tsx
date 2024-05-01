import { useEffect } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { getBaseLayout } from '@/layouts/publ/BaseLayout/BaseLayout'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { authActions } from '@/services/authService/store/slice/authEndpoints.slice'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const GitHubPage = () => {
  const { isReady, push, query } = useRouter()
  const { data: me } = useGetMeQuery() as { data: UserType }
  const dispatch = useAppDispatch()

  if (query.accessToken && query.email) {
    setCookie('accessToken', query.accessToken as string, {
      maxAge: 30 * 60,
      sameSite: 'none',
      secure: true,
    })
    dispatch(authActions.setEmail(query.email as string))
  }

  useEffect(() => {
    if (!isReady) {
      return
    }
    if (query.accessToken && me.userId) {
      void push(`${ROUTES.PROFILE}/${me.userId}`)
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
