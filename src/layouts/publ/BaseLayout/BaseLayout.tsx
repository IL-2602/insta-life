import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/publ/AuthLayout'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { PRIVATE_ROUTES, ROUTES } from '@/shared/constants/routes'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { useGetMeQuery } from '@/services/authService/authEndpoints'

const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const { data: me } = useGetMeQuery()

  const router = useRouter()

  const { pathname } = router

  // const isPrivatePassName = !!PRIVATE_ROUTES.find(route => route === pathname)
  const isPrivatePassName = !!me
  return (
    <>
      {isPrivatePassName ? (
        <MainLayout>{children}</MainLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
