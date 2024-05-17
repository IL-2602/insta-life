import { memo } from 'react'

import { DevicesProps } from '@/widgets/profile/profileSettings/ui/devices/container'

import s from './Devices.module.scss'
import { Typography } from '@/shared/ui/Typography'
import { Device } from '@/widgets/profile/profileSettings/ui/devices/ui/Device/Device'
import { Button } from '@/shared/ui/Button'

export const Devices = memo(({ t, sessions }: DevicesProps) => {
  return (
    <div className={s.container}>
      <div className={s.currDevice}>
        <Typography variant={'h3'}>{t.profileSettings.tab.devices.thisDevices}</Typography>
        <Device t={t} session={sessions?.[0]} current />
      </div>
      <div className={s.closeSessions}>
        <Button variant={'outlined'}>
          <Typography variant={'h3'}>{t.button.terminateAllOtherSession}</Typography>{' '}
        </Button>
      </div>
      <div className={s.activeDevice}>
        <Typography variant={'h3'}>{t.profileSettings.tab.devices.activeSessions}</Typography>
        {sessions?.map(s => <Device key={s.deviceId} t={t} session={s} />)}
      </div>
    </div>
  )
})
