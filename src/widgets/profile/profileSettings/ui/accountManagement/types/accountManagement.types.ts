export type SubscriptionsType = {
  [key: string]: { amount: number; type: 'DAY' | 'MONTHLY' | 'WEEKLY' }
}

export type RadioInputsType = Record<string, string>
