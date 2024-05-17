import s from './Device.module.scss'
import { Typography } from '@/shared/ui/Typography'
import { Button } from '@/shared/ui/Button'
import { Local } from '../../../../../../../../locales/en'
import { LogOutIcon } from '@/shared/assets/icons/asideIcons/logOutIcon'
import { MobileIcon } from '@/shared/assets/icons/Mobile'
import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'
import { DesktopIcon } from '@/shared/assets/icons/Desktop'
import { ReactElement } from 'react'
import { format } from 'date-fns'
import { Simulate } from 'react-dom/test-utils'
import seeked = Simulate.seeked

type SessionIconType = {
  mobile: ReactElement
  desktop: ReactElement
}

const SessionIcon: SessionIconType = {
  mobile: <MobileIcon />,
  desktop: <DesktopIcon />,
}

export const Device = ({ current = false, t, session }: Props) => {
  const currentIcon = session?.deviceType || 'desktop'
  return (
    <div className={s.container}>
      <div className={s.descWrapper}>
        <div className={s.icon}>{SessionIcon[currentIcon as keyof SessionIconType]}</div>
        <div className={s.desc}>
          <Typography variant={'bold16'}>{session?.browserName}</Typography>
          <Typography variant={'regular14'}>IP: {session?.ip}</Typography>
          {!current && session?.lastActive && (
            <Typography variant={'small'}>
              {t.profileSettings.tab.devices.lastVisit}:{' '}
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
  t: Local
  session?: Partial<Session>
}
