import { memo, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

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
  const { inView, ref } = useInView({
    threshold: 1,
  })

  const toSignUp = async () => {
    await router.push(ROUTES.REGISTER)
  }

  const toSignIn = async () => {
    await router.push(ROUTES.LOGIN)
  }

  const { data: notification } = useSubscribeToNotificationsQuery()
  const [lastNotificationId, setLastNotificationId] = useState(() =>
    notification && notification.id ? notification.id.toString() : ''
  )
  const { data: notificationsData, isFetching: isFetchingNotification } = useGetNotificationQuery({
    cursor: lastNotificationId,
  })

  useEffect(() => {
    if (notification?.id) {
      setLastNotificationId(notification.id.toString())
    }
  }, [notification])
  useEffect(() => {
    console.log('inView', inView)
    if (
      inView &&
      notificationsData &&
      notificationsData.items.length > 0 &&
      notification &&
      notificationsData.items[notificationsData.items.length - 1].id !== +lastNotificationId
    ) {
      setLastNotificationId(
        notificationsData.items[notificationsData.items.length - 1].id.toString()
      )
    }
  }, [inView])

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
              <Notification
                inView={inView}
                isFetching={isFetchingNotification}
                notifications={notificationsData}
                ref={ref}
              />
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
