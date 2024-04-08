import { useState } from 'react'

import { Maximize } from '@/shared/assets/icons/Maximize'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { Slider } from '@/shared/ui/Slider/Slider'

import s from './changeZoom.module.scss'

export const ChangeZoom = () => {
  const [state, setState] = useState<[number]>([1])

  return (
    <DropMenu.Menu
      align={'start'}
      side={'top'}
      sideOffset={2}
      trigger={
        <Button className={s.button} variant={'link'}>
          <Maximize />
        </Button>
      }
    >
      <DropMenu.Item>
        <Slider onValueChange={setState} slidersValue={state} />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}
