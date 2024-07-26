import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { UserType } from '@/services/authService/lib/authEndpoints.types'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import { useIndexedDB } from '@/shared/utils/indexedDB/useIndexedDb'
import { useRouter } from 'next/router'

import s from './ClosePostModal.module.scss'

export const ClosePostModal = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { data } = useGetMeQuery() as { data: UserType }

  const id = data.userId

  const db = useIndexedDB('PostDraft', 1, [{ name: 'myDraftStore', options: { keyPath: 'id' } }])

  const [draftFromIndexedDB, setDraftFromIndexedDB] = useState()

  const isClosePostModal = useAppSelector(state => state.postReducer.isClosePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)
  const postDescription = useAppSelector(state => state.postReducer.postDescription)
  const dispatch = useAppDispatch()

  const clearPostDraft = () => {
    dispatch(postActions.setPostDescription(''))
    dispatch(postActions.setClearPostPhotos())
    dispatch(postActions.setModalSteps('upload'))
  }
  const onDiscard = () => {
    dispatch(postActions.setIsClosePostModal(false))
    clearPostDraft()
    deleteDB()
  }

  const checkUserId = () => {
    //@ts-ignore
    if (draftFromIndexedDB && draftFromIndexedDB.draft.userId === id) {
      saveDB() /// ???
    } else {
      saveDB()
    }
  }

  const onSaveDraft = () => {
    dispatch(postActions.setIsClosePostModal(false))
    dispatch(postActions.setIsCreatePostModal(false))
    checkUserId()
  }

  const deleteDB = () => {
    if (db && id) {
      const transaction = db.transaction(['myDraftStore'], 'readwrite')
      const objectStore = transaction.objectStore('myDraftStore')

      objectStore.delete(id)
    }
  }

  const saveDB = () => {
    if (db) {
      const transaction = db.transaction(['myDraftStore'], 'readwrite')
      const objectStore = transaction.objectStore('myDraftStore')

      const draftData = {
        draft: {
          modalSteps: modalSteps,
          postDescription: postDescription,
          postPhotos: postPhotos,
          userId: id,
        },
        id: id,
      }

      objectStore.put(draftData)
      dispatch(postActions.setPostDescription(''))
    }
  }

  useEffect(() => {
    const request = window.indexedDB.open('PostDraft', 1)

    request.onupgradeneeded = event => {
      //@ts-ignore
      const db = event.target.result

      db.createObjectStore('myDraftStore', { keyPath: 'id' })
    }

    request.onsuccess = event => {
      //@ts-ignore
      const db = event.target.result
      const transaction = db.transaction(['myDraftStore'], 'readwrite')
      const objectStore = transaction.objectStore('myDraftStore')

      const getRequest = objectStore.get(id)

      getRequest.onsuccess = () => {
        setDraftFromIndexedDB(getRequest.result)
      }
    }
  }, [])

  return (
    <Modal
      className={locale === 'ru' ? s.closeModalRu : s.closeModalEn}
      customButtonsBlock={<></>}
      modalHandler={onDiscard}
      open={isClosePostModal}
      title={t.modal.closeModalTitle}
    >
      <div className={s.content}>
        <Typography variant={'regular16'}>{t.modal.closeModalTextOne}</Typography>
        <Typography variant={'regular16'}>{t.modal.closeModalTextTwo}</Typography>
        <div className={s.buttonsBlock}>
          <Button disabled={false} onClick={onDiscard} variant={'outlined'}>
            <Typography variant={'h3'}>{t.button.discard}</Typography>
          </Button>
          <Button className={s.button} disabled={false} onClick={onSaveDraft} variant={'primary'}>
            <Typography variant={'h3'}>{t.button.saveDraft}</Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
