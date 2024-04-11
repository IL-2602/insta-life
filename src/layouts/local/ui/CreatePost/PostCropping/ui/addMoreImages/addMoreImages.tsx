import { Control } from 'react-hook-form'

import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'
import Image from 'next/image'

import s from './addMoreImages.module.scss'

export const AddMoreImages = ({ control, extraAction, onChangeCurrPhoto, photos }: Props) => {
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
              alt={'Photo Preview'}
              height={80}
              key={idx}
              onClick={() => onChangeCurrPhoto(idx)}
              src={photo}
              width={80}
            />
          ))}
          <ControlledFileUploader
            className={s.fileBtn}
            control={control}
            extraActions={extraAction}
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
  extraAction: () => void
  onChangeCurrPhoto: (currPhoto: number) => void
  photos?: string[]
}
