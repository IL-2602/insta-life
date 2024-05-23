import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'
import { ChromeIcon } from '@/shared/assets/icons/Chrome'
import { DesktopIcon } from '@/shared/assets/icons/Desktop'
import { FireFoxIcon } from '@/shared/assets/icons/FireFox'
import { MobileIcon } from '@/shared/assets/icons/Mobile'
import { OperaIcon } from '@/shared/assets/icons/Opera'
import { UnknownIcon } from '@/shared/assets/icons/Unknown'
import { YandexIcon } from '@/shared/assets/icons/Yandex/Yandex'
import { LogOutIcon } from '@/shared/assets/icons/asideIcons/logOutIcon'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import { format } from 'date-fns'

import s from './Device.module.scss'

import { Local } from '../../../../../../../../locales/en'

export const Device = ({
  current = false,
  handleDeleteSession,
  handleLogOut,
  isLoadingLogOut,
  isOpen,
  session,
  sessionLoadingState,
  setIsOpen,
  t,
}: Props) => {
  let browserIcon = <UnknownIcon />

  const { data: me } = useGetMeQuery() as { data: UserType }

  switch (session?.browserName) {
    case 'Chrome': {
      browserIcon = <ChromeIcon />
      break
    }
    case 'Opera': {
      browserIcon = <OperaIcon />
      break
    }
    case 'Firefox': {
      browserIcon = <FireFoxIcon />
      break
    }
    case 'Yandex': {
      browserIcon = <YandexIcon />
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

  if (!sessionLoadingState) {
    return null
  }

  return (
    <>
      <div
        className={clsx(
          s.container,
          session?.deviceId && sessionLoadingState[session?.deviceId] ? s.blackout : ''
        )}
      >
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

        {session?.deviceId && sessionLoadingState[session?.deviceId] && (
          <div className={s.spinner}>
            <Spinner />
          </div>
        )}

        {!current && (
          <Button
            className={s.logoutBtn}
            onClick={() => handleDeleteSession(session?.deviceId)}
            variant={'noStyle'}
          >
            <LogOutIcon />
            <Typography variant={'medium14'}>{t.sidebar.logOut}</Typography>
          </Button>
        )}
      </div>
      {!isLoadingLogOut ? (
        <Modal
          logOut
          modalHandler={() => setIsOpen(false)}
          onSubmit={handleLogOut}
          open={isOpen}
          title={t.auth.modal.notification}
        >
          <Typography variant={'regular16'}>
            {t.auth.modal.modalLogOutText.getEmail(me?.email)}
          </Typography>
        </Modal>
      ) : (
        <div className={s.logOutSpinner}>
          <Spinner />
        </div>
      )}
    </>
  )
}

type Props = {
  current?: boolean
  handleDeleteSession: (deviceId: number | undefined) => Promise<null | void>
  handleLogOut: () => void
  isLoadingLogOut?: boolean
  isOpen: boolean
  session?: Partial<Session>
  sessionLoadingState?: { [key: number]: boolean }
  setIsOpen: (isOpen: boolean) => void
  t: Local
}
