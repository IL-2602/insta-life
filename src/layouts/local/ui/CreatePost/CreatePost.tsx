import React from 'react'
import { Modal } from '@/shared/ui/Modal/v2'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { CreatePostModal } from '@/layouts/local/ui/CreatePost/CreatePostModal'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { PostCropping } from '@/layouts/local/ui/CreatePost/PostCropping'
import { CreatePostModalHeader } from '@/layouts/local/ui/CreatePost/createPostModalHeader'
import { PostFilter } from '@/layouts/local/ui/CreatePost/PostFilter'
import { ClosePostModal } from '@/shared/components/ClosePostModal/ClosePostModal'

export const CreatePost = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)

  const showModalSaveDraftHandler = () => dispatch(postActions.setIsClosePostModal(true))
  const closePostModalHandler = () => dispatch(postActions.setIsCreatePostModal(false))

  const content = {
    cropping: <PostCropping.widget />,
    filters: <PostFilter.widget />,
    publication: <div>publication</div>,
    upload: <CreatePostModal.widget />,
  }
  const title = {
    cropping: t.post.cropping,
    filters: t.post.filters,
    publication: t.modal.publicationTitle,
    upload: t.modal.addPhotoModalTitle,
  }

  const customHeader = {
    upload: null,
    cropping: (
      <CreatePostModalHeader
        title={t.post.cropping}
        btnTitle={'Next'}
        prevStep={'upload'}
        nextStep={'filters'}
      />
    ),
    filters: (
      <CreatePostModalHeader
        title={t.post.filters}
        btnTitle={'Next'}
        prevStep={'cropping'}
        nextStep={'publication'}
      />
    ),
    publication: <div>Header Publication</div>,
  }

  return (
    <>
      <ClosePostModal />
      <Modal
        open={isCreatePostModal}
        onOpen={modalSteps === 'upload' ? closePostModalHandler : showModalSaveDraftHandler}
        title={title[modalSteps]}
        customHeader={customHeader[modalSteps]}
      >
        {content[modalSteps]}
      </Modal>
    </>
  )
}
