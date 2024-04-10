import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'

export const useContainer = () => {
  const [zoom, setZoom] = useState(1)
  const {
    control,
    formState: { errors },
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })
  const postPhoto = useAppSelector(state => state.postReducer.postPhoto)
  const modalStep = useAppSelector(state => state.postReducer?.modalSteps)
  return { control, setZoom, postPhoto, modalStep }
}
