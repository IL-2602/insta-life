import { ChangeEvent, useEffect, useState } from 'react'

import {
  useCanceledAutoRenewalMutation,
  useGetSubscriptionsQuery,
  usePostSubscriptionsMutation,
} from '@/services/subscriptionsService/subscriptionsEndpoints'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import {
  RadioInputsType,
  SubscriptionsType,
} from '@/widgets/profile/profileSettings/ui/accountManagement/types/accountManagement.types'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const [accountType, setAccountType] = useState('personal')
  const [subscriptionCost, setSubscriptionCost] = useState('dailySubscription')
  const [isModalSubscription, setIsModalSubscription] = useState(false)

  const { t } = useTranslation()
  const { push, query, replace } = useRouter()

  const accountTypes: RadioInputsType[] = [
    {
      id: 'personal-account',
      name: 'personal-account',
      title: t.profileSettings.tab.accountManagement.accountTypePersonal,
      value: 'personal',
    },
    {
      id: 'business-account',
      name: 'business-account',
      title: t.profileSettings.tab.accountManagement.accountTypeBusiness,
      value: 'business',
    },
  ]

  const subscriptionCosts: RadioInputsType[] = [
    {
      id: 'dailySubscription',
      name: 'dailySubscription',
      title: t.profileSettings.tab.accountManagement.accountTypeBusinessPrice.perDay,
      value: 'dailySubscription',
    },
    {
      id: 'weeklySubscription',
      name: 'weeklySubscription',
      title: t.profileSettings.tab.accountManagement.accountTypeBusinessPrice.perWeek,
      value: 'weeklySubscription',
    },
    {
      id: 'monthlySubscription',
      name: 'monthlySubscription',
      title: t.profileSettings.tab.accountManagement.accountTypeBusinessPrice.perMonth,
      value: 'monthlySubscription',
    },
  ]

  const subscriptions: SubscriptionsType = {
    dailySubscription: {
      amount: 10,
      type: 'DAY',
    },
    monthlySubscription: {
      amount: 100,
      type: 'MONTHLY',
    },
    weeklySubscription: {
      amount: 50,
      type: 'WEEKLY',
    },
  }

  const [postSubscriptions, { isLoading: isLoadingPostSubs }] = usePostSubscriptionsMutation()
  const { data: currentSubscriptionData, isLoading: isLoadingCurrSubs } = useGetSubscriptionsQuery()
  const [cancelAutoRenewal, { isLoading: isLoadingAutoRenewal }] = useCanceledAutoRenewalMutation()

  const cancelAutoRenewalHandler = () => cancelAutoRenewal()

  useEffect(() => {
    if (!isLoadingCurrSubs && (query.success === 'true' || query.error || query.token)) {
      setIsModalSubscription(true)
    }
  }, [query.token, query.success, query.error, isLoadingCurrSubs])

  const handlePayment = async (typePayment: 'PAYPAL' | 'STRIPE') => {
    const body = {
      amount: subscriptions[subscriptionCost].amount,
      baseUrl: FRONTEND_URL + ROUTES.PROFILE_SETTINGS,
      paymentType: typePayment,
      typeSubscription: subscriptions[subscriptionCost].type,
    } as const

    try {
      const { url } = await postSubscriptions(body).unwrap()

      await push(url)
    } catch (err) {
      console.error(err)
    }
  }

  const accountTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value)
  }

  const subscriptionCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubscriptionCost(event.target.value)
  }

  const closeModalHandler = async () => {
    setIsModalSubscription(false)
    await replace(ROUTES.PROFILE_SETTINGS, undefined, { shallow: true })
  }

  const isLoading = isLoadingPostSubs || isLoadingAutoRenewal || isLoadingCurrSubs

  return {
    accountType,
    accountTypeChange,
    accountTypes,
    cancelAutoRenewalHandler,
    closeModalHandler,
    currentSubscriptionData,
    handlePayment,
    isLoading,
    isModalSubscription,
    query,
    setIsModalSubscription,
    subscriptionCost,
    subscriptionCostChange,
    subscriptionCosts,
    t,
  }
}
