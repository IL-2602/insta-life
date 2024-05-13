import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountManagement.module.scss'

type Props = {
  handlePayment: (arg: 'PAYPAL' | 'STRIPE') => void
  isLoading: boolean
}

export const PaymentButtons = ({ handlePayment, isLoading }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.payment}>
      <Button
        className={s.paymentBtn}
        disabled={isLoading}
        onClick={() => handlePayment('PAYPAL')}
        variant={'noStyle'}
      >
        <PayPal />
      </Button>
      <Typography as={'span'} variant={'regular14'}>
        {t.profileSettings.tab.accountManagement.paymentChoice}
      </Typography>
      <Button
        className={s.paymentBtn}
        disabled={isLoading}
        onClick={() => handlePayment('STRIPE')}
        variant={'noStyle'}
      >
        <Stripe />
      </Button>
    </div>
  )
}
