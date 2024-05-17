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

type SessionIcon = {
  desktop: ReactElement
  mobile: ReactElement
}
type BrowserIcon = {
  Chrome: ReactElement
  Yandex: ReactElement
}

export const Device = ({ current = false, session, t }: Props) => {
  const currentSessionIcon = session?.deviceType || 'desktop'
  const currentBrowserIcon = session?.browserName || 'Chrome'

  const SessionIcon: SessionIcon = {
    desktop: <DesktopIcon />,
    mobile: <MobileIcon />,
  }
  const BrowserIcon: BrowserIcon = {
    Chrome: <ChromeIcon />,
    Yandex: <YandexIcon />,
  }
  return (
    <div className={s.container}>
      <div className={s.descWrapper}>
        <div className={s.icon}>
          {current
            ? BrowserIcon[currentBrowserIcon as keyof BrowserIcon]
            : SessionIcon[currentSessionIcon as keyof SessionIcon]}
        </div>
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
