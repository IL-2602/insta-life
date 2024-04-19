import { Expand } from '@/shared/assets/icons/Expand'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { RectangleHorizontal } from '@/shared/assets/icons/RectangleHorizontal'
import { RectangleVertical } from '@/shared/assets/icons/RectangleVertical'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { Typography } from '@/shared/ui/Typography'
import { clsx } from 'clsx'
import { Square } from 'src/shared/assets/icons/Square'

import s from './expandSize.module.scss'

import { Local } from '../../../../../../../../locales/en'

export const ExpandSize = ({ aspect, setAspect, t }: Props) => {
  return (
    <DropMenu.Menu
      align={'start'}
      className={s.container}
      side={'top'}
      sideOffset={2}
      trigger={
        <Button className={s.button} variant={'link'}>
          <Expand />
        </Button>
      }
    >
      <DropMenu.Item className={clsx(aspect === 0 && s.active)} onClick={() => setAspect(0)}>
        <Typography variant={aspect === 0 ? 'h3' : 'regular14'}>{t.button.original}</Typography>
        <ImageIcon />
      </DropMenu.Item>
      <DropMenu.Item className={clsx(aspect === 1 && s.active)} onClick={() => setAspect(1)}>
        <Typography variant={aspect === 1 ? 'h3' : 'regular14'}>1:1</Typography>
        <Square />
      </DropMenu.Item>
      <DropMenu.Item
        className={clsx(aspect === 4 / 5 && s.active)}
        onClick={() => setAspect(4 / 5)}
      >
        <Typography variant={aspect === 4 / 5 ? 'h3' : 'regular14'}>4:5</Typography>
        <RectangleVertical />
      </DropMenu.Item>
      <DropMenu.Item
        className={clsx(aspect === 16 / 9 && s.active)}
        onClick={() => setAspect(16 / 9)}
      >
        <Typography variant={aspect === 16 / 9 ? 'h3' : 'regular14'}>16:9</Typography>
        <RectangleHorizontal />
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  aspect?: number
  setAspect: (aspect: number) => void
  t: Local
}
