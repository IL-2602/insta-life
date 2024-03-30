export const checkAge = (birthDate: Date): boolean => {
  const today: Date = new Date()
  const diff: number = today.getTime() - birthDate.getTime()
  const age: number = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))

  if (age >= 13) {
    return true
  } else {
    return false
  }
}
