import { Maximize } from '@/shared/assets/icons/Maximize'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { Slider } from '@/shared/ui/Slider/Slider'

import s from './changeZoom.module.scss'
import { PostPhoto } from '@/services/postService/lib/postEndpoints.types'

export const ChangeZoom = ({ setZoom, zoom = 1 }: Props) => {
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
          max={5}
          min={1}
          onValueChange={val => setZoom({ zoom: val[0] })}
          slidersValue={[zoom]}
          step={1}
        />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  setZoom: ({ zoom }: Pick<PostPhoto, 'zoom'>) => void
  zoom?: number
}
