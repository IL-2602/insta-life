import { Bell } from '@/shared/assets/icons/Bell'
import { ROUTES } from '@/shared/constants/routes'
import { Container } from '@/shared/ui/Container'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'

import s from './Header.module.scss'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const Header = () => {
  const { data: me } = useGetMeQuery()
  const { t } = useTranslation()
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link href={ROUTES.HOME}>
          <Typography color={'light'} variant={'h1'}>
            InstaLife
          </Typography>
        </Link>
        <div className={s.wrapper}>
          {!!me && (
            <button className={s.bellButton}>
              <Bell />
              <Typography as={'span'} className={s.span}>
                3
              </Typography>
            </button>
          )}

          <LangSwitcher />
          {!me && (
            <>
              <Button as={'a'} variant={'link'} href={ROUTES.LOGIN}>
                <Typography variant={'h3'}>{t.auth.button.signInButton}</Typography>
              </Button>
              <Button as={'a'} variant={'primary'} href={ROUTES.REGISTER}>
                <Typography variant={'h3'}>{t.auth.button.signUpButton}</Typography>
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
