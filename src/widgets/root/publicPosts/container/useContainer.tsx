import { useState } from 'react'

import {
  useGetAllPostsQuery,
  useGetTotalCountQuery,
} from '@/services/publicService/publicEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const [currPhotoIndex, setCurrPhotoIndex] = useState<number>(0)
  const [openPosts, setOpenPosts] = useState<{ [key: string]: boolean }>({})

  const { data: users } = useGetTotalCountQuery()
  const { data: posts } = useGetAllPostsQuery({ endCursorPostId: undefined })

  const onChangeCurrPhoto = (currPhoto: number) => {
    setCurrPhotoIndex(currPhoto)
  }

  return {
    currPhotoIndex,
    onChangeCurrPhoto,
    openPosts,
    posts,
    setOpenPosts,
    t,
    users,
  }
}
