import { Dispatch, SetStateAction, useState } from 'react'

import { Maximize } from '@/shared/assets/icons/Maximize'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { Slider } from '@/shared/ui/Slider/Slider'

import s from './changeZoom.module.scss'

export const ChangeZoom = ({ setZoom, zoom }: Props) => {
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
      <DropMenu.Item onSelect={e => e.preventDefault()}>
        <Slider
          onValueChange={val => setZoom(val[0])}
          slidersValue={[zoom]}
          step={1}
          min={1}
          max={5}
        />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
}
