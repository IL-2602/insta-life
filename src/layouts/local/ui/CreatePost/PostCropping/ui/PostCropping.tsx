import { memo } from 'react'

import { Props } from '@/layouts/local/ui/CreatePost/PostCropping/container'
import { AddMoreImages } from '@/layouts/local/ui/CreatePost/PostCropping/ui/addMoreImages/addMoreImages'
import { ChangeZoom } from '@/layouts/local/ui/CreatePost/PostCropping/ui/changeZoom/changeZoom'
import { ExpandSize } from '@/layouts/local/ui/CreatePost/PostCropping/ui/expandSize/expandSize'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostCropping.module.scss'

export const PostCropping = memo(({ control }: Props) => {
  return (
    <Modal
      className={s.container}
      customButtonsBlock={<></>}
      nextStepBtn={
        <Button variant={'secondary'}>
          <Typography color={'primary'} variant={'h3'}>
            Next
          </Typography>
        </Button>
      }
      open
      previousStepBtn={
        <Button variant={'secondary'}>
          <Typography color={'light'} variant={'h3'}>
            {'<'}
          </Typography>
        </Button>
      }
      title={'Cropping'}
    >
      <div className={s.croppingWrapper}>
        <Image alt={`image Cropping`} className={s.img} height={500} src={''} width={490} />
        <div className={s.btnGroup}>
          <ExpandSize />
          <ChangeZoom />
          <div>
            <AddMoreImages control={control} />
          </div>
        </div>
      </div>
    </Modal>
  )
})
