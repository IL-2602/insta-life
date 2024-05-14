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
    cancelAutoRenewalHandler,
    closeModalHandler,
    currentSubscriptionData,
    handlePayment,
    isBusinessAccount,
    isLoading,
    isModalSubscription,
    query,
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
          <CurrentSubscription
            {...currentSubscriptionData}
            onCancelAutoRenewal={cancelAutoRenewalHandler}
          />
          <AccountType
            accountType={accountType}
            accountTypeChange={accountTypeChange}
            accountTypes={accountTypes}
            isBusinessAccount={!!isBusinessAccount}
          />
          {accountType === 'business' && (
            <>
              <SubscriptionCosts
                subscriptionCost={subscriptionCost}
                subscriptionCostChange={subscriptionCostChange}
                subscriptionCosts={subscriptionCosts}
              />
              <PaymentButtons handlePayment={handlePayment} isLoading={isLoading} />
            </>
          )}
        </div>

        <Modal
          customButtonsBlock={<></>}
          modalHandler={closeModalHandler}
          open={isModalSubscription}
          title={
            query.success
              ? t.modal.successTransactionModalTitle
              : t.modal.errorTransactionModalTitle
          }
        >
          <div className={s.modalContainer}>
            <Typography variant={'regular16'}>
              {query.success
                ? t.modal.successTransactionModalDescription
                : t.modal.errorTransactionModalDescription}
            </Typography>
            <Button fullWidth onClick={closeModalHandler}>
              {query.success ? 'OK' : t.button.backToPayment}
            </Button>
          </div>
        </Modal>
      </>
    )
  }
)
