import { memo, useEffect, useState } from 'react'

import { WS_EVENT_PATH } from '@/services/authService/lib/wsConstants'
import { NotificationResponse } from '@/services/notificationService/lib/notificationEndpoints.types'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Notification } from '@/shared/ui/Notification'
import { Typography } from '@/shared/ui/Typography'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'

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
  //const [subscribeToNotifications] = useSubscribeToNotificationsMutation()
  const [notificationData, setNotificationData] = useState<NotificationResponse[]>([])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    const socket = io('https://inctagram.work', {
      query: {
        accessToken,
      },
    })

    socket.on(WS_EVENT_PATH.ERROR, () => console.log('WS Error'))

    socket.on(WS_EVENT_PATH.NOTIFICATIONS, data => {
      console.log(data, 'NOTIFICATION')
      if (data) {
        setNotificationData(notificationData => [...notificationData, data])
      }
    })

    return () => {
      socket.disconnect()
      console.log('WS DISC')
    }
  }, [])

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
              <Notification notifications={notificationData} />
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
