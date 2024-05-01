import { memo } from 'react'

import { HeaderProps } from '@/layouts/local/ui/Header/container'
import { Bell } from '@/shared/assets/icons/Bell'
import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'

import s from './Header.module.scss'

export const Header = memo(({ me, router, t, toSignIn, toSignUp }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link href={ROUTES.DEFAULT}>
          <Typography color={'light'} variant={'h1'}>
            InstaLife
          </Typography>
        </Link>
        <div className={s.wrapper}>
          {me ? (
            <div className={s.meContainer}>
              <button className={s.bellButton}>
                <Bell />
                <Typography as={'span'} className={s.span}>
                  3
                </Typography>
              </button>
              <LangSwitcher />
            </div>
          ) : (
            <div className={s.notMeContainer}>
              <LangSwitcher />
              {router.pathname === ROUTES.LOGIN || router.pathname === ROUTES.REGISTER ? (
                ''
              ) : (
                <>
                  <Button className={s.btnLogIn} onClick={toSignIn} variant={'link'}>
                    <Typography variant={'h3'}>{t.auth.button.signInButton}</Typography>
                  </Button>
                  <Button className={s.btnSignUp} onClick={toSignUp} variant={'primary'}>
                    <Typography variant={'h3'}>{t.auth.button.signUpButton}</Typography>
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  )
})
