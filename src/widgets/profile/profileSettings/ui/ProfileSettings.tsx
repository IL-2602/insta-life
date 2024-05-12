import { memo, useEffect, useState } from 'react'

import { ProfileSettingsProps } from '@/widgets/profile/profileSettings/container'
import { AccountManagement } from '@/widgets/profile/profileSettings/ui/accountManagement'
import { Devices } from '@/widgets/profile/profileSettings/ui/devices'
import { GeneralInformation } from '@/widgets/profile/profileSettings/ui/generalInformation'
import { MyPayments } from '@/widgets/profile/profileSettings/ui/myPayments'
import * as Tabs from '@radix-ui/react-tabs'

import s from './ProfileSettings.module.scss'

export const ProfileSettings = memo(({ handleTabChange, selectedTab, t }: ProfileSettingsProps) => {
  return (
    <Tabs.Root className={s.tabsRoot} defaultValue={selectedTab}>
      <Tabs.List aria-label={'Profile Settings'} className={s.tabsList}>
        <Tabs.Trigger
          className={s.tabsTrigger}
          onClick={() => handleTabChange('tab1')}
          value={'tab1'}
        >
          {t.profileSettings.tab.generalInformation.generalInformationTitle}
        </Tabs.Trigger>
        <Tabs.Trigger
          className={s.tabsTrigger}
          onClick={() => handleTabChange('tab2')}
          value={'tab2'}
        >
          {t.profileSettings.tab.devices.devicesTitle}
        </Tabs.Trigger>
        <Tabs.Trigger
          className={s.tabsTrigger}
          onClick={() => handleTabChange('tab3')}
          value={'tab3'}
        >
          {t.profileSettings.tab.accountManagement.accountManagementTitle}
        </Tabs.Trigger>
        <Tabs.Trigger
          className={s.tabsTrigger}
          onClick={() => handleTabChange('tab4')}
          value={'tab4'}
        >
          {t.profileSettings.tab.myPayments.myPaymentsTitle}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={s.tabsContent} value={'tab1'}>
        <GeneralInformation.widget />
      </Tabs.Content>
      <Tabs.Content className={s.tabsContent} value={'tab2'}>
        <Devices.widget />
      </Tabs.Content>
      <Tabs.Content className={s.tabsContent} value={'tab3'}>
        <AccountManagement.widget />
      </Tabs.Content>
      <Tabs.Content className={s.tabsContent} value={'tab4'}>
        <MyPayments.widget />
      </Tabs.Content>
    </Tabs.Root>
  )
})
