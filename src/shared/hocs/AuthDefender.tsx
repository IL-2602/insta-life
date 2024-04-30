import { useEffect } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export const AuthDefender = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const { isReady, push } = useRouter()

    const { data, isError, isFetching } = useGetMeQuery()

    const getLayout = Page.getLayout ?? (page => page)

    useEffect(() => {
      if (!isReady) {
        return
      }
      if (isError) {
        void push(ROUTES.LOGIN)
      }
    }, [data, push, isError])

    if (!data || isFetching) {
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
