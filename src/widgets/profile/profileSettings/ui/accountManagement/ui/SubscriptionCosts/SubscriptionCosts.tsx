import { ChangeEvent } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Typography } from '@/shared/ui/Typography'
import { RadioInputsType } from '@/widgets/profile/profileSettings/ui/accountManagement/types/accountManagement.types'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'

type Props = {
  subscriptionCost: string
  subscriptionCostChange: (event: ChangeEvent<HTMLInputElement>) => void
  subscriptionCosts: RadioInputsType[]
}

export const SubscriptionCosts = ({
  subscriptionCost,
  subscriptionCostChange,
  subscriptionCosts,
}: Props) => {
  const { t } = useTranslation()

  return (
    <fieldset className={s.subscriptionCosts}>
      <Typography as={'legend'} variant={'h3'}>
        {t.profileSettings.tab.accountManagement.yourSubscriptionCosts}
      </Typography>
      <div className={s.radioWrapper}>
        {subscriptionCosts.map((subscription, index) => (
          <div key={index}>
            <input
              checked={subscriptionCost === subscription.value}
              id={subscription.id}
              name={subscription.name}
              onChange={subscriptionCostChange}
              type={'radio'}
              value={subscription.value}
            />
            <Typography as={'label'} htmlFor={subscription.id} variant={'regular14'}>
              {subscription.title}
            </Typography>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
