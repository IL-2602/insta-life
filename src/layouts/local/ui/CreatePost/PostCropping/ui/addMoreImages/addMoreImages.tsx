import { Control } from 'react-hook-form'

import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'
import Image from 'next/image'

import s from './addMoreImages.module.scss'

export const AddMoreImages = ({ control, photos, extraAction, onChangeCurrPhoto }: Props) => {
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
          {photos?.map((photo, idx) => (
            <Image
              key={idx}
              alt={'Photo Preview'}
              height={80}
              src={photo}
              width={80}
              onClick={() => onChangeCurrPhoto(idx)}
            />
          ))}
          <ControlledFileUploader
            className={s.fileBtn}
            control={control}
            name={'postPhoto'}
            variant={'outlined'}
            extraActions={extraAction}
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
  photos?: string[]
  extraAction: () => void
  onChangeCurrPhoto: (currPhoto: number) => void
}
