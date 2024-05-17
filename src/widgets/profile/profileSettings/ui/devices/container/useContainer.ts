import { useEffect, useState } from 'react'

import { useGetSessionsQuery } from '@/services/devicesService/devicesEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const [ip, setIp] = useState('')
  const [isLoadingIp, setIsLoadingIp] = useState(false)

  const { data: sessions, isLoading: isLoadingSessions } = useGetSessionsQuery()

  let browser = 'Unknown'

  if (navigator.userAgent.includes('YaBrowser')) {
    browser = 'Yandex'
  } else if (navigator.userAgent.includes('Firefox')) {
    browser = 'Firefox'
  } else if (navigator.userAgent.includes('OPR')) {
    browser = 'Opera'
  } else if (navigator.userAgent.includes('Chrome')) {
    browser = 'Chrome'
  }

  const isLoading = isLoadingSessions || isLoadingIp

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const fetchIp = async () => {
      setIsLoadingIp(true)
      try {
        const resp = await fetch('https://api.ipify.org?format=json', { signal })
        const res = await resp.json()

        if (res?.ip) {
          setIp(res.ip)
        }
      } finally {
        setIsLoadingIp(false)
      }
    }

    void fetchIp()

    return () => abortController.abort()
  }, [])

  return { browser, ip, isLoading, sessions, t }
}
