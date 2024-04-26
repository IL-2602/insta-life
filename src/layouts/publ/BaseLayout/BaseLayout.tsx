import { PropsWithChildren, ReactElement } from 'react'

import { AuthProvider } from '@/app/providers/authProvider'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { AuthLayout } from '@/layouts/publ/AuthLayout'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { PRIVATE_ROUTES, ROUTES } from '@/shared/constants/routes'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const token = useAppSelector(state => state.authReducer.accessToken)
  const router = useRouter()

  const { asPath, pathname } = router

  const isPublicPathName =
    (!token && asPath.startsWith(ROUTES.PROFILE)) ||
    pathname === '/' ||
    pathname.startsWith(ROUTES.AUTH)

  return (
    <>
      {!isPublicPathName ? (
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
