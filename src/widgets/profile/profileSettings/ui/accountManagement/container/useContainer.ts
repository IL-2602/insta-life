import { ChangeEvent, useState } from 'react'

import {
  useGetSubscriptionsQuery,
  usePostSubscriptionsMutation,
} from '@/services/subscriptionsService/subscriptionsEndpoints'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { useTranslation } from '@/shared/hooks/useTranslation'
import {
  RadioInputsType,
  SubscriptionsType,
} from '@/widgets/profile/profileSettings/ui/accountManagement/types/accountManagement.types'

export const useContainer = () => {
  const [accountType, setAccountType] = useState('personal')
  const [subscriptionCost, setSubscriptionCost] = useState('dailySubscription')
  const [isModalSubscription, setIsModalSubscription] = useState(false)

  const { t } = useTranslation()

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

  const accountTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value)
  }

  const subscriptionCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubscriptionCost(event.target.value)
  }

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

  const [postSubscriptions, { isLoading, isSuccess }] = usePostSubscriptionsMutation()
  const { data: currentSubscriptionData } = useGetSubscriptionsQuery()
  const handlePayment = async (typePayment: 'PAYPAL' | 'STRIPE') => {
    const body = {
      amount: subscriptions[subscriptionCost].amount,
      baseUrl: FRONTEND_URL,
      paymentType: typePayment,
      typeSubscription: subscriptions[subscriptionCost].type,
    } as const

    try {
      const { url } = await postSubscriptions(body).unwrap()

      window.open(url, '_blank')
    } catch (err) {
      console.log(err)
    } finally {
      setIsModalSubscription(true)
    }
  }

  return {
    accountType,
    accountTypeChange,
    accountTypes,
    currentSubscriptionData,
    handlePayment,
    isLoading,
    isModalSubscription,
    isSuccess,
    setIsModalSubscription,
    subscriptionCost,
    subscriptionCostChange,
    subscriptionCosts,
    t,
  }
}
