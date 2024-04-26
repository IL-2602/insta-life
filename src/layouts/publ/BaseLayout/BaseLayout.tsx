import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/publ/AuthLayout'
import { MainLayout } from '@/layouts/publ/MainLayout'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { PRIVATE_ROUTES, ROUTES } from '@/shared/constants/routes'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'

const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const token = useAppSelector(state => state.authReducer.accessToken)
  const router = useRouter()

  const { asPath, pathname } = router
  console.log()
  const isPublicPathName =
    (!token && asPath.startsWith(ROUTES.PROFILE)) ||
    pathname === '/' ||
    pathname.startsWith(ROUTES.AUTH)

  return (
    <>
      {!isPublicPathName ? (
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
