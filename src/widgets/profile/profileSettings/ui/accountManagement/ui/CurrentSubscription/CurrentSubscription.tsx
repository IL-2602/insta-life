import {
  GetCurrentPaymentSubscriptionResponse,
  Payment,
} from '@/services/subscriptionsService/lib/subscriptionsEndpoints.types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Typography } from '@/shared/ui/Typography'
import { add, format } from 'date-fns'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'

export const CurrentSubscription = (subscriptionsData: Props) => {
  const { data, hasAutoRenewal, onCancelAutoRenewal } = subscriptionsData
  const { t } = useTranslation()

  return (
    <fieldset className={s.currentSubscription}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.currentSubscription}
      </Typography>
      <div className={s.subscriptionWrapper}>
        <div className={s.subscriptionHeader}>
          <Typography color={'form'} variant={'regular14'}>
            {t.profileSettings.tab.accountManagement.expireAt}
          </Typography>
          <Typography color={'form'} variant={'regular14'}>
            {t.profileSettings.tab.accountManagement.nextPayment}
          </Typography>
        </div>
        {data?.map(sub => (
          <div className={s.subscriptionRow} key={sub.subscriptionId}>
            <Typography variant={'bold14'}>
              {format(new Date(sub.endDateOfSubscription), 'dd.MM.yyyy')}
            </Typography>
            {sub.autoRenewal && (
              <Typography variant={'bold14'}>
                {format(add(sub.endDateOfSubscription, { days: 1 }), 'dd.MM.yyyy')}
              </Typography>
            )}
          </div>
        ))}
      </div>
      <div className={s.checkboxWrapper}>
        <Checkbox
          checked={hasAutoRenewal || false}
          disabled={!data?.length}
          label={t.profileSettings.tab.accountManagement.autoRenewal}
          onChange={checked => checked && onCancelAutoRenewal}
        />
      </div>
    </fieldset>
  )
}

type Props = Partial<GetCurrentPaymentSubscriptionResponse> & { onCancelAutoRenewal: () => void }
