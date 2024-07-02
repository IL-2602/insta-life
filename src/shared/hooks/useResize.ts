import { useEffect, useState } from 'react'

import { SCREEN_LG, SCREEN_MD, SCREEN_SM, SCREEN_XL, SCREEN_XXL } from '../constants/breakpoints'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      setWidth((event.target as Window).innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isScreenLg: width >= SCREEN_LG,
    isScreenMd: width >= SCREEN_MD,
    isScreenSm: width >= SCREEN_SM,
    isScreenXl: width >= SCREEN_XL,
    isScreenXxl: width >= SCREEN_XXL,
    width,
  }
}
