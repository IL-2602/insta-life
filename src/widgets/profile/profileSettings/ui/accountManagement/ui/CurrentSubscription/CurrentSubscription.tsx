import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'
import { Checkbox } from '@/shared/ui/Checkbox'

export const CurrentSubscription = () => {
  const { t } = useTranslation()

  return (
    <fieldset className={s.currentSubscription}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.currentSubscription}
      </Typography>
      <div className={s.subscriptionWrapper}>
        <div className={s.subscriptionItem}>
          <Typography variant={'regular14'} color={'form'}>
            Expire at
          </Typography>
          <Typography variant={'bold14'}>12.12.2022</Typography>
        </div>
        <div className={s.subscriptionItem}>
          <Typography variant={'regular14'} color={'form'}>
            Next payment
          </Typography>
          <Typography variant={'bold14'}>13.02.2023</Typography>
        </div>
      </div>
      <div className={s.checkboxWrapper}>
        <Checkbox checked={true} label={'Auto-Renewal'} />
      </div>
    </fieldset>
  )
}
