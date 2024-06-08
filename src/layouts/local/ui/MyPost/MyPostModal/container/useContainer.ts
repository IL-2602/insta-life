import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useMyPostSchema } from '@/layouts/local/ui/MyPost/MyPostModal/schema/myPostPublicationSchema'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import {
  useCreateAnswerCommentMutation,
  useCreateCommentMutation,
  useEditPostMutation,
  useGetCurrentPostQuery,
  useGetPostAnswersCommentsQuery,
  useGetPostCommentsQuery,
  useUpdateLikeStatusCommentMutation,
} from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { isMyPostModal } = useAppSelector(state => state.postReducer)
  const { error: meError } = useGetMeQuery()
  const dispatch = useAppDispatch()
  const [commentId, setCommentId] = useState<number | undefined>(undefined)

  const { t } = useTranslation()

  const { query, replace } = useRouter()
  const postId = query?.postId as string | undefined

  useEffect(() => {
    if (postId) {
      dispatch(postActions.setIsMyPostModal(true))
    }
  }, [dispatch, postId])

  const { data: postPhotos, isFetching: isPostFetching } = useGetCurrentPostQuery(Number(postId), {
    skip: !postId,
  })
  const [updateLikeStatus] = useUpdateLikeStatusCommentMutation()
  const { data: comments } = useGetPostCommentsQuery(Number(postId))
  const { data: getProfile, isFetching: isGetUserLoading } = useGetProfileQuery()
  const { data: answersComments } = useGetPostAnswersCommentsQuery(
    { commentId, postId },
    { skip: !commentId && !postId }
  )
  const [editPost, { isLoading: isLoadingEditPost }] = useEditPostMutation()
  const [createComment] = useCreateCommentMutation()
  const [createAnswerComment] = useCreateAnswerCommentMutation()
  const [isOpenClosePostModal, setIsOpenClosePostModal] = useState(false)
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [answerCommentText, setAnswerCommentText] = useState('')
  const [isAnswers, setIsAnswers] = useState(false)

  const { myPostSchema } = useMyPostSchema()

  type myPostFormSchema = z.infer<typeof myPostSchema>

  const postComments = comments?.items
  const answers = answersComments?.items

  const setCreateAnswer = (value: boolean, commentId: number) => {
    setIsAnswers(value)
    if (value) {
      setCommentId(commentId)
    }
    setCommentId(undefined)
  }

  // console.log('ANSWERS : ', answers)
  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<myPostFormSchema>({
    defaultValues: {
      myPostDescription: postPhotos?.description,
    },
    mode: 'onTouched',
    resolver: zodResolver(myPostSchema),
  })

  const myPostDescription = watch('myPostDescription')
  const { myPostDescription: errorDescription } = errors

  useEffect(() => {
    reset({ myPostDescription: postPhotos?.description })
  }, [reset, postPhotos?.description])

  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)
  const commentTextHandler = (comment: string) => {
    setCommentText(comment)
  }
  const answerCommentTextHandler = (answerText: string) => {
    setAnswerCommentText(answerText)
  }
  const commentPublish = () => {
    if (commentText !== '' && postId !== 'undefined') {
      createComment({ comment: commentText, postId: Number(postId) })
      setCommentText('')
    }
  }
  const answerCommentSend = (postId: number, commentId: number) => {
    createAnswerComment({ answerComment: answerCommentText, commentId, postId })
    setAnswerCommentText('')
  }
  const changeIsLikedStatus = (commentId: number, likeStatus: string, postId: number) => {
    updateLikeStatus({ commentId, likeStatus, postId })
  }
  const deletePostModalHandler = (id: number) => {
    dispatch(postActions.setIsDeletePostModal(true))
    setIsEdit(false)
  }

  const handleCloseModal = () => {
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
    dispatch(postActions.setIsMyPostModal(false))
    setIsEdit(false)
  }
  const closeModalWithRefresh = () => {
    setIsOpenClosePostModal(false)
    setIsEdit(false)
    reset({ myPostDescription: postPhotos?.description })
  }
  const handleClosePostModal = () => {
    setIsOpenClosePostModal(false)
    setIsEdit(false)
    void replace({ query: { id: query.id } }, undefined, {
      shallow: true,
    })
  }

  const updatePost = () => {
    if (myPostDescription !== postPhotos?.description) {
      editPost({ description: myPostDescription, postId: Number(postId) })
        .unwrap()
        .then(() => {
          reset({ myPostDescription })
          setIsEdit(false)
          toast.success('The post has been edit', {
            pauseOnHover: false,
            style: {
              background: '#0A6638',
              border: '1px solid #14CC70',
              color: 'white',
              fontSize: '14px',
            },
          })
        })
        .catch((err: any) => {
          toast.error('Error: The post has not been edit ', {
            pauseOnHover: false,
            style: {
              background: '#660A1D',
              border: '1px solid #CC1439',
              color: 'white',
              fontSize: '14px',
            },
          })
        })
    } else {
      setIsEdit(false)
    }
  }

  const handleOpenEditPostDialog = () => setIsOpenClosePostModal(true)
  const handleCloseEditPostDialog = () => setIsOpenClosePostModal(false)
  const setIsEditPostHandler = () => setIsEdit(p => !p)

  const isLoading = isGetUserLoading || isPostFetching

  return {
    answerCommentSend,
    answerCommentText,
    answerCommentTextHandler,
    answers,
    changeIsLikedStatus,
    closeModalWithRefresh,
    commentPublish,
    commentText,
    commentTextHandler,
    control,
    currPhotoIndex,
    deletePostModalHandler,
    errorDescription,
    getProfile,
    handleCloseEditPostDialog,
    handleCloseModal,
    handleClosePostModal,
    handleOpenEditPostDialog,
    isAnswers,
    isEdit,
    isGetUserLoading,
    isLoading,
    isLoadingEditPost,
    isMyPostModal,
    isOpenClosePostModal,
    meError,
    myPostDescription,
    onChangeCurrPhoto,
    postComments,
    postId,
    postPhotos,
    setAnswerCommentText,
    setCreateAnswer,
    setIsEditPostHandler,
    t,
    updatePost,
  }
}
