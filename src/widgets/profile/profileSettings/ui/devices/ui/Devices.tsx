import { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { DevicesProps } from '@/widgets/profile/profileSettings/ui/devices/container'
import { Device } from '@/widgets/profile/profileSettings/ui/devices/ui/Device/Device'

import s from './Devices.module.scss'

export const Devices = memo(({ browser, ip, isLoading, sessions, t }: DevicesProps) => {
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
        <Typography variant={'h3'}>{t.profileSettings.tab.devices.thisDevices}</Typography>
        <Device current session={{ browserName: browser, ip }} t={t} />
      </div>
      <div className={s.closeSessions}>
        <Button variant={'outlined'}>
          <Typography variant={'h3'}>{t.button.terminateAllOtherSession}</Typography>{' '}
        </Button>
      </div>
      <div className={s.activeDevice}>
        <Typography variant={'h3'}>{t.profileSettings.tab.devices.activeSessions}</Typography>
        {sessions?.map(s => <Device key={s.deviceId} session={s} t={t} />)}
      </div>
    </div>
  )
})
