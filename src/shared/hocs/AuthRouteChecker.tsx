import { useEffect } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export const AuthRouteChecker = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const { push } = useRouter()

    const getLayout = Page.getLayout ?? (page => page)

    const { currentData, data, isFetching } = useGetMeQuery() as {
      currentData: UserType
      data: UserType
      isFetching: boolean
    }

    useEffect(() => {
      if (data) {
        const userId = data?.userId

        void push(ROUTES.PROFILE + `/${userId}`)
      }
    }, [data, push])

    if (currentData || data) {
      return null
    }

    if (isFetching) {
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            minWidth: '100%',
          }}
        >
          <Spinner />
        </div>
      )
    }

    return getLayout(<Page {...pageProps} />)
  }

  return Component
}
