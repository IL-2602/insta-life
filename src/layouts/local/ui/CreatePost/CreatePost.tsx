import React from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { CreatePostModal } from '@/layouts/local/ui/CreatePost/CreatePostModal'
import { PostCropping } from '@/layouts/local/ui/CreatePost/PostCropping'
import { PostFilter } from '@/layouts/local/ui/CreatePost/PostFilter'
import { PostPublication } from '@/layouts/local/ui/CreatePost/PostPublication'
import { CreatePostModalHeader } from '@/layouts/local/ui/CreatePost/createPostModalHeader'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { ClosePostModal } from '@/shared/components/ClosePostModal/ClosePostModal'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Modal } from '@/shared/ui/Modal/v2'

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
    publication: <PostPublication.widget />,
    upload: <CreatePostModal.widget />,
  }
  const title = {
    cropping: t.post.cropping,
    filters: t.post.filters,
    publication: t.modal.publicationTitle,
    upload: t.modal.addPhotoModalTitle,
  }

  const customHeader = {
    cropping: (
      <CreatePostModalHeader
        btnTitle={t.button.next}
        nextStep={'filters'}
        prevStep={'upload'}
        title={t.post.cropping}
      />
    ),
    filters: (
      <CreatePostModalHeader
        btnTitle={t.button.next}
        nextStep={'publication'}
        prevStep={'cropping'}
        title={t.post.filters}
      />
    ),
    publication: (
      <CreatePostModalHeader
        btnTitle={t.post.publication}
        nextStep={'filters'}
        onNext={() => alert('publication')}
        prevStep={'filters'}
        title={t.modal.publicationTitle}
      />
    ),
    upload: null,
  }

  return (
    <>
      <ClosePostModal />
      <Modal
        customHeader={customHeader[modalSteps]}
        onOpen={modalSteps === 'upload' ? closePostModalHandler : showModalSaveDraftHandler}
        open={isCreatePostModal}
        title={title[modalSteps]}
      >
        {content[modalSteps]}
      </Modal>
    </>
  )
}
