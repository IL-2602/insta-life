import { useForm } from 'react-hook-form'

import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { useCreateNewCommentMutation } from '@/services/commentsAnswersService/commentsAnswersEndpoints'
import { useGetCurrentPostQuery } from '@/services/postService/postEndpoints'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { usePostSchema } from '@/widgets/posts/local/schema/myPostPublicationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { query } = useRouter()
  const postId = query?.postId as string | undefined

  const { t } = useTranslation()

  const { error: meError } = useGetMeQuery()
  const { data: profile, isFetching: isGetUserLoading } = useGetProfileQuery()
  const { myPostSchema } = usePostSchema()
  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })
  const [createNewComment] = useCreateNewCommentMutation()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const { control, setValue, watch } = useForm<myPostFormSchema>({
    defaultValues: {
      comment: '',
      myPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const isMe = !meError
  const postDescription = watch('myPostDescription')
  const postComment = watch('comment')

  const commentPublishHandler = () =>
    postId &&
    postComment?.trim() &&
    createNewComment({ content: postComment, postId: +postId })
      .unwrap()
      .then(() => setValue('comment', ''))

  return {
    commentPublishHandler,
    control,
    isMe,
    postDescription,
    postPhotos,
    profile,
    t,
  }
}
