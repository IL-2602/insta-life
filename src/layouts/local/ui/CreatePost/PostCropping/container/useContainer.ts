import { useState } from 'react'

export const useContainer = () => {
  const [zoom, setZoom] = useState(1)

  return { setZoom }
}
