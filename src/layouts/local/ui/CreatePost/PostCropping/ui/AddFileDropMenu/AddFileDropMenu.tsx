import { useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import Image from 'next/image'

import image from '../../../../../../../../public/assets/image-outline.svg'

export const AddFileDropMenu = () => {
  return (
    <DropMenu.Menu
      align={'end'}
      forceMount
      side={'top'}
      sideOffset={2}
      trigger={
        <Button variant={'link'}>
          <Image alt={'Add more image'} height={24} src={image} width={24} />
        </Button>
      }
    >
      <DropMenu.Item>Hallo</DropMenu.Item>
    </DropMenu.Menu>
  )
}
