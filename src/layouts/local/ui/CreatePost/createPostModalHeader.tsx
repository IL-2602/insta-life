import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import s from './createPostModalHeader.module.scss'
import { ArrowIosBack } from '@/shared/assets/icons/ArrowIosBack/ArrowIosBack'
import React from 'react'
import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { ModalSteps } from '@/services/postService/lib/postEndpoints.types'
export const CreatePostModalHeader = ({ btnTitle, title, prevStep, nextStep }: Props) => {
  const dispatch = useAppDispatch()
  const onPrev = () => dispatch(postActions.setModalSteps(prevStep))
  const onNext = () => dispatch(postActions.setModalSteps(nextStep))

  return (
    <div className={s.container}>
      <Button variant={'noStyle'} onClick={onPrev}>
        <ArrowIosBack />
      </Button>
      <Typography variant={'h1'}>{title}</Typography>
      <Button variant={'noStyle'} className={s.nextbtn} onClick={onNext}>
        <Typography variant={'h3'}>{btnTitle}</Typography>
      </Button>
    </div>
  )
}

type Props = {
  btnTitle: string
  title: string
  nextStep: ModalSteps
  prevStep: ModalSteps
}
