export const paymentsValidity = (value: 'DAY' | 'MONTHLY' | 'WEEKLY') => {
  switch (value) {
    case 'DAY':
      return '1 day'
    case 'MONTHLY':
      return '1 month'
    case 'WEEKLY':
      return '7 days'
    default:
      return null
  }
}
