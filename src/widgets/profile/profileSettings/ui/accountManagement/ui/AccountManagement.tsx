import { memo } from 'react'

import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { AccountManagementProps } from '@/widgets/profile/profileSettings/ui/accountManagement/container'
import { clsx } from 'clsx'

import s from './AccountManagement.module.scss'

export const AccountManagement = memo(
  ({
    accountType,
    accountTypeChange,
    accountTypes,
    handlePayment,
    isLoading,
    isModalSubscription,
    isSuccess,
    setIsModalSubscription,
    subscriptionCost,
    subscriptionCostChange,
    subscriptionCosts,
    t,
  }: AccountManagementProps) => {
    return (
      <>
        {isLoading && (
          <div className={s.spinner}>
            <Spinner />
          </div>
        )}
        <div className={clsx(s.container, isLoading ? s.opacity : '')}>
          <fieldset className={s.accountTypes}>
            <Typography as={'legend'} variant={'h3'}>
              {t.profileSettings.tab.accountManagement.accountType}
            </Typography>
            <div className={s.radioWrapper}>
              {accountTypes.map((account, index) => (
                <div key={index}>
                  <input
                    checked={accountType === account.value}
                    id={account.id}
                    name={account.name}
                    onChange={accountTypeChange}
                    type={'radio'}
                    value={account.value}
                  />
                  <Typography as={'label'} htmlFor={account.id} variant={'regular14'}>
                    {account.title}
                  </Typography>
                </div>
              ))}
            </div>
          </fieldset>
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
        </div>

        <Modal
          customButtonsBlock={<></>}
          modalHandler={() => setIsModalSubscription(false)}
          open={isModalSubscription}
          title={
            isSuccess ? t.modal.successTransactionModalTitle : t.modal.errorTransactionModalTitle
          }
        >
          <div className={s.modalContainer}>
            <Typography variant={'regular16'}>
              {isSuccess
                ? t.modal.successTransactionModalDescription
                : t.modal.errorTransactionModalDescription}
            </Typography>
            <Button fullWidth>{isSuccess ? 'OK' : t.button.backToPayment}</Button>
          </div>
        </Modal>
      </>
    )
  }
)
