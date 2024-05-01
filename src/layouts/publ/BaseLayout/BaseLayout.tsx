import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/publ/AuthLayout'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { PRIVATE_ROUTES, ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  const router = useRouter()
  const { pathname } = router

  const isPrivatePassName = !!PRIVATE_ROUTES.find(route => route === pathname)

  const isDefaultPathname = pathname === ROUTES.DEFAULT

  const { data: me, isLoading } = useGetMeQuery()

  return (
    <>
      {isPrivatePassName || (isDefaultPathname && me) ? (
        <MainLayout>{isLoading ? <Spinner /> : children}</MainLayout>
      ) : (
        <AuthLayout>{isLoading ? <Spinner /> : children}</AuthLayout>
      )}
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
