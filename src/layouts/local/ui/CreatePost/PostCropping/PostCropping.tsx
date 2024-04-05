import { AddFileDropMenu } from '@/layouts/local/ui/CreatePost/PostCropping/ui/AddFileDropMenu/AddFileDropMenu'
import { usePostCropping } from '@/layouts/local/ui/CreatePost/PostCropping/usePostCropping'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './PostCropping.module.scss'

import expand from '../../../../../../public/assets/expand-outline.svg'
import image from '../../../../../../public/assets/image-outline.svg'
import maximize from '../../../../../../public/assets/maximize-outline.svg'

export const PostCropping = ({ isOpen }: Props) => {
  const { setAspect, setZoom } = usePostCropping()

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
      open={isOpen}
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
          <Button variant={'link'}>
            <Image alt={'Image expand'} height={24} src={expand} width={24} />
          </Button>
          <Button variant={'link'}>
            <Image alt={'Image zoom'} height={24} src={maximize} width={24} />
          </Button>
          <div>
            <AddFileDropMenu />
          </div>
        </div>
      </div>
    </Modal>
  )
}

type Props = {
  isOpen: boolean
}
