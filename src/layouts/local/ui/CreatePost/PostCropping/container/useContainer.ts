import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  createPostModalFormSchema,
  createPostModalSchema,
} from '@/layouts/local/ui/CreatePost/CreatePostModal/schema/createPostModalSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useContainer = () => {
  const [zoom, setZoom] = useState(1)
  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
  } = useForm<createPostModalFormSchema>({
    resolver: zodResolver(createPostModalSchema),
  })
  return { setZoom, control }
}
