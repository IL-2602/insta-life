import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { Providers } from '@/app/providers/providers'
import { wrapper } from '@/app/store'
import { useLoader } from '@/shared/hooks/useLoader'
import { NextPage } from 'next'

import '@/styles/nprogress.scss'
import '@/styles/variables/index.scss'
import { Provider } from 'react-redux'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(pageProps)
  const getLayout = Component.getLayout ?? (page => page)

  useLoader()

  return (
    <Provider store={store}>
      <Providers>{getLayout(<Component {...props} />)}</Providers>
    </Provider>
  )
}

export default App
