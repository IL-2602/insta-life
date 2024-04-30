import { Spinner } from '@/shared/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { AppProps } from 'next/app'
import { NextPageWithLayout } from '@/pages/_app'

export const AuthDefender = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const { push, isReady } = useRouter()

    const { data, isError, isFetching } = useGetMeQuery()

    const getLayout = Page.getLayout ?? (page => page)

    useEffect(() => {
      if (!isReady) return
      if (isError) {
        void push(ROUTES.LOGIN)
      }
    }, [data, push, isError])

    if (!data || isFetching) {
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
