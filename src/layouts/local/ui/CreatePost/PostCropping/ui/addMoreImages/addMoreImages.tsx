import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'

import s from './addMoreImages.module.scss'
export const AddMoreImages = () => {
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
      <DropMenu.Item>
        <Button>+</Button>
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}
