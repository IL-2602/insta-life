import React from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { ModalSteps } from '@/services/postService/lib/postEndpoints.types'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from './createPostModalHeader.module.scss'
export const CreatePostModalHeader = ({ btnTitle, nextStep, prevStep, title }: Props) => {
  const dispatch = useAppDispatch()
  const onPrev = () => dispatch(postActions.setModalSteps(prevStep))
  const onNext = () => dispatch(postActions.setModalSteps(nextStep))

  return (
    <div className={s.container}>
      <Button onClick={onPrev} variant={'noStyle'}>
        <ArrowIosBack />
      </Button>
      <Typography variant={'h1'}>{title}</Typography>
      <Button className={s.nextbtn} onClick={onNext} variant={'noStyle'}>
        <Typography variant={'h3'}>{btnTitle}</Typography>
      </Button>
    </div>
  )
}

type Props = {
  btnTitle: string
  nextStep: ModalSteps
  prevStep: ModalSteps
  title: string
}
