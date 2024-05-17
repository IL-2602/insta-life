import { ReactElement } from 'react'

import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'
import { ChromeIcon } from '@/shared/assets/icons/Chrome'
import { DesktopIcon } from '@/shared/assets/icons/Desktop'
import { MobileIcon } from '@/shared/assets/icons/Mobile'
import { YandexIcon } from '@/shared/assets/icons/Yandex/Yandex'
import { LogOutIcon } from '@/shared/assets/icons/asideIcons/logOutIcon'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { format } from 'date-fns'

import s from './Device.module.scss'

import { Local } from '../../../../../../../../locales/en'

export const Device = ({ current = false, session, t }: Props) => {
  let browserIcon = <YandexIcon />

  switch (session?.browserName) {
    case 'Chrome': {
      browserIcon = <ChromeIcon />
      break
    }
    default: {
      break
    }
  }

  let sessionsIcon = <DesktopIcon />

  switch (session?.deviceType) {
    case 'mobile': {
      sessionsIcon = <MobileIcon />
      break
    }
    default: {
      break
    }
  }

  return (
    <div className={s.container}>
      <div className={s.descWrapper}>
        <div className={s.icon}>{current ? browserIcon : sessionsIcon}</div>
        <div className={s.desc}>
          <Typography variant={'bold16'}>{session?.browserName}</Typography>
          <Typography variant={'regular14'}>IP: {session?.ip}</Typography>
          {!current && session?.lastActive && (
            <Typography variant={'small'}>
              {t.profileSettings.tab.devices.lastVisit}:
              {format(new Date(session?.lastActive), 'dd.MM.yyyy')}
            </Typography>
          )}
        </div>
      </div>
      {!current && (
        <Button className={s.logoutBtn} variant={'noStyle'}>
          <LogOutIcon />
          <Typography variant={'medium14'}>{t.sidebar.logOut}</Typography>{' '}
        </Button>
      )}
    </div>
  )
}

type Props = {
  current?: boolean
  session?: Partial<Session>
  t: Local
}
