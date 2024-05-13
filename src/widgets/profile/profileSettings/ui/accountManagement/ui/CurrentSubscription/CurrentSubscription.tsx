import { useTranslation } from '@/shared/hooks/useTranslation'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Typography } from '@/shared/ui/Typography'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'
import {
  GetCurrentPaymentSubscriptionResponse,
  Payment,
} from '@/services/subscriptionsService/lib/subscriptionsEndpoints.types'

export const CurrentSubscription = (subscriptionsData: Props) => {
  const { data, hasAutoRenewal } = subscriptionsData
  const { t } = useTranslation()

  return (
    <fieldset className={s.currentSubscription}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.currentSubscription}
      </Typography>
      <div className={s.subscriptionWrapper}>
        <div className={s.subscriptionRow}>
          <div>
            <Typography color={'form'} variant={'regular14'}>
              {t.profileSettings.tab.accountManagement.expireAt}
            </Typography>
            <Typography variant={'bold14'}>12.12.2022</Typography>
          </div>
          <div>
            <Typography color={'form'} variant={'regular14'}>
              {t.profileSettings.tab.accountManagement.nextPayment}
            </Typography>
            <Typography variant={'bold14'}>13.02.2023</Typography>
          </div>
        </div>
      </div>
      <div className={s.checkboxWrapper}>
        {hasAutoRenewal && (
          <Checkbox
            checked={hasAutoRenewal}
            onChange={e => {}}
            label={t.profileSettings.tab.accountManagement.autoRenewal}
          />
        )}
      </div>
    </fieldset>
  )
}

type Props = GetCurrentPaymentSubscriptionResponse
