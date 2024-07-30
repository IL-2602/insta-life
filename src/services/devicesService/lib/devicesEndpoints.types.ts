export type Session = {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type SessionsResponse = {
  current: Session
  others: Session[]
}
