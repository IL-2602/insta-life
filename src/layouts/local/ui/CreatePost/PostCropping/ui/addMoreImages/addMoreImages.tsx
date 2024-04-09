import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'

import s from './addMoreImages.module.scss'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'
import { Control } from 'react-hook-form'
export const AddMoreImages = ({ control }: Props) => {
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
        <ControlledFileUploader
          control={control}
          name={'postPhoto'}
          variant={'outlined'}
          className={s.fileBtn}
        >
          +
        </ControlledFileUploader>
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  control: Control<{ postPhoto?: File | undefined }, any>
}
