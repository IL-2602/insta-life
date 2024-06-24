import { memo } from 'react'

import {
  useGetNotificationQuery,
  useSubscribeToNotificationsQuery,
} from '@/services/notificationService/notificationEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Notification } from '@/shared/ui/Notification'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

type Props = {
  isAuth?: boolean
}

export const Header = memo(({ isAuth }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()

  const toSignUp = async () => {
    await router.push(ROUTES.REGISTER)
  }

  const toSignIn = async () => {
    await router.push(ROUTES.LOGIN)
  }
  const { data: notification } = useSubscribeToNotificationsQuery()
  const { data: notificationsData } = useGetNotificationQuery({
    cursor: notification && notification.id ? notification.id.toString() : '',
  })

  console.log('HEADER ', notification)
  console.log('HEADER notificationsData ', notificationsData)

  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link href={ROUTES.DEFAULT}>
          <Typography color={'light'} variant={'h1'}>
            InstaLife
          </Typography>
        </Link>
        <div className={s.wrapper}>
          {isAuth ? (
            <div className={s.meContainer}>
              <Notification notifications={notificationsData} />
              <LangSwitcher />
            </div>
          ) : (
            <div className={s.notMeContainer}>
              <LangSwitcher />
              <Button className={s.btnLogIn} onClick={toSignIn} variant={'link'}>
                <Typography variant={'h3'}>{t.auth.button.signInButton}</Typography>
              </Button>
              <Button className={s.btnSignUp} onClick={toSignUp} variant={'primary'}>
                <Typography variant={'h3'}>{t.auth.button.signUpButton}</Typography>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
})
