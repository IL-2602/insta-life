import { ChangeEvent, useState } from 'react'

import { usePostSubscriptionsMutation } from '@/services/subscriptionsService/subscriptionsEndpoints'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const [accountType, setAccountType] = useState('personal')
  const [subscriptionCost, setSubscriptionCost] = useState('dailySubscription')
  const [isModalSubscription, setIsModalSubscription] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()

  const accountTypes = [
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

  const subscriptionCosts = [
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

  type SubscriptionsType = {
    [key: string]: { amount: number; type: 'DAY' | 'MONTHLY' | 'WEEKLY' }
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

  const handlePayment = async (typePayment: 'PAYPAL' | 'STRIPE') => {
    const body = {
      amount: subscriptions[subscriptionCost].amount,
      baseUrl: FRONTEND_URL,
      paymentType: typePayment,
      typeSubscription: subscriptions[subscriptionCost].type,
    } as const

    try {
      const { url } = await postSubscriptions(body).unwrap()

      // window.open(url, '_blank')
      await router.push(url)
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
