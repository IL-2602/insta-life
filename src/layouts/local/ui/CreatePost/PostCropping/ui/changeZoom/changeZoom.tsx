import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import Image from 'next/image'

import maximize from '../../../../../../../../public/assets/maximize-outline.svg'

export const ChangeZoom = () => {
  return (
    <DropMenu.Menu
      align={'start'}
      side={'top'}
      sideOffset={2}
      trigger={
        <Button variant={'link'}>
          <Image alt={'Image zoom'} height={24} src={maximize} width={24} />
        </Button>
      }
    >
      <DropMenu.Item>
        <input type={'range'} />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}
