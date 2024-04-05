import { useState } from 'react'

export const usePostCropping = () => {
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(1)

  return {
    setAspect,
    setZoom,
  }
}
