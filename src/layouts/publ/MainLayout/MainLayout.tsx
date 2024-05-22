import { PropsWithChildren } from 'react'

import { SideBar } from '@/layouts/local/ui/SideBar'
import { Header } from '@/shared/components/Header/Header'
import { Container } from '@/shared/ui/Container'
import { Wrapper } from '@/shared/ui/Wrapper'
import { NextPage } from 'next'

import s from './MainLayout.module.scss'
import { MobileSideBar } from '@/layouts/local/ui/MobileSideBar'

export const MainLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_INTERNET_CONNECTION === 'false'
  ) {
    return (
      <>
        <Header isAuth />
        <Container className={s.wrapper}>
          <SideBar.widget />
          <main className={s.main}>{children}</main>
          <MobileSideBar.widget />
        </Container>
      </>
    )
  }

  return (
    <Wrapper>
      <Header isAuth />
      <Container className={s.wrapper}>
        <SideBar.widget />
        <main className={s.main}>{children}</main>
        <MobileSideBar.widget />
      </Container>
    </Wrapper>
  )
}
