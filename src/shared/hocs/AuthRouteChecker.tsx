import { Spinner } from '@/shared/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'
import { useEffect } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'

export const AuthRouteChecker = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const { push } = useRouter()

    const getLayout = Page.getLayout ?? (page => page)

    const { currentData, data, isFetching } = useGetMeQuery() as {
      data: UserType
      isFetching: boolean
      currentData: UserType
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
            minWidth: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
