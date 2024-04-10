import { Control } from 'react-hook-form'

import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'

import s from './addMoreImages.module.scss'
import Image from 'next/image'

export const AddMoreImages = ({ control, photo }: Props) => {
  return (
    <DropMenu.Menu
      align={'end'}
      forceMount
      side={'top'}
      sideOffset={2}
      trigger={
        <Button className={s.button} variant={'link'}>
          <ImageIcon />
        </Button>
      }
    >
      <DropMenu.Item onSelect={(e: Event) => e.preventDefault()}>
        <div className={s.container}>
          {photo && <Image src={photo} alt={'Photo Preview'} height={80} width={80} />}
          <ControlledFileUploader
            className={s.fileBtn}
            control={control}
            name={'postPhoto'}
            variant={'outlined'}
          >
            +
          </ControlledFileUploader>
        </div>
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  control: Control<{ postPhoto?: File | undefined }, any>
  photo?: string
}
