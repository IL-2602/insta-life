import { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { DevicesProps } from '@/widgets/profile/profileSettings/ui/devices/container'
import { Device } from '@/widgets/profile/profileSettings/ui/devices/ui/Device/Device'

import s from './Devices.module.scss'

export const Devices = memo(
  ({
    browser,
    handleDeleteSession,
    handleLogOut,
    handleTerminateAllOtherSessions,
    ip,
    isLoading,
    isLoadingLogOut,
    isOpen,
    sessionLoadingState,
    sessions,
    setIsOpen,
    t,
  }: DevicesProps) => {
    if (isLoading) {
      return (
        <div className={s.spinner}>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={s.container}>
        <div className={s.currDevice}>
          <Typography className={s.currDeviceTitle} variant={'h3'}>
            {t.profileSettings.tab.devices.thisDevices}
          </Typography>
          <Device
            current
            handleDeleteSession={handleDeleteSession}
            handleLogOut={handleLogOut}
            isLoadingLogOut={isLoadingLogOut}
            isOpen={isOpen}
            key={s.deviceId}
            session={{ browserName: browser, ip }}
            sessionLoadingState={sessionLoadingState}
            setIsOpen={setIsOpen}
            t={t}
          />
        </div>
        {sessions && sessions.others.length > 1 && (
          <div className={s.closeSessions}>
            <Button onClick={() => handleTerminateAllOtherSessions()} variant={'outlined'}>
              <Typography variant={'h3'}>{t.button.terminateAllOtherSession}</Typography>
            </Button>
          </div>
        )}

        <div className={s.activeDevice}>
          <Typography variant={'h3'}>{t.profileSettings.tab.devices.activeSessions}</Typography>
          {sessions?.others.map(s => (
            <Device
              handleDeleteSession={handleDeleteSession}
              handleLogOut={handleLogOut}
              isLoadingLogOut={isLoadingLogOut}
              isOpen={isOpen}
              key={s.deviceId}
              session={s}
              sessionLoadingState={sessionLoadingState}
              setIsOpen={setIsOpen}
              t={t}
            />
          ))}
        </div>
      </div>
    )
  }
)

Devices.displayName = 'Devices'
