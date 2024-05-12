import { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { AccountManagementProps } from '@/widgets/profile/profileSettings/ui/accountManagement/container'
import { AccountType } from '@/widgets/profile/profileSettings/ui/accountManagement/ui/AccountType'
import { CurrentSubscription } from '@/widgets/profile/profileSettings/ui/accountManagement/ui/CurrentSubscription'
import { PaymentButtons } from '@/widgets/profile/profileSettings/ui/accountManagement/ui/PaymentButtons'
import { SubscriptionCosts } from '@/widgets/profile/profileSettings/ui/accountManagement/ui/SubscriptionCosts'
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
          <CurrentSubscription />
          <AccountType
            accountType={accountType}
            accountTypeChange={accountTypeChange}
            accountTypes={accountTypes}
          />
          <SubscriptionCosts
            subscriptionCost={subscriptionCost}
            subscriptionCostChange={subscriptionCostChange}
            subscriptionCosts={subscriptionCosts}
          />
          <PaymentButtons handlePayment={handlePayment} isLoading={isLoading} />
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
